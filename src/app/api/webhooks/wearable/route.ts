import { NextResponse } from 'next/server';
import { verifyHmacSignature } from '@/lib/security/crypto';
import { executeCalendarDefense } from '@/lib/calendar/engine';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const payload = JSON.parse(rawBody);
    
    const signature = request.headers.get('x-webhook-signature') || request.headers.get('whoop-signature');
    const provider = request.headers.get('x-biomesh-provider') || 'unknown'; 

    let providerUserId: string | null = null;
    let currentHrv: number | null = null;
    let currentRhr: number | null = null;

    // Route A: Native Mobile Edge Nodes (Health Connect / HealthKit)
    if (provider === 'healthkit' || provider === 'health_connect') {
      const mobileAuthToken = request.headers.get('authorization')?.split('Bearer ')[1];
      if (!mobileAuthToken) return NextResponse.json({ error: 'Missing native auth token' }, { status: 401 });

      const { data: userAuth, error: authError } = await supabaseAdmin.auth.getUser(mobileAuthToken);
      if (authError || !userAuth.user) return NextResponse.json({ error: 'Invalid native auth token' }, { status: 401 });
      
      providerUserId = userAuth.user.id; // For native, the provider ID maps directly to the Supabase Auth UUID
      currentHrv = payload.hrv;
      currentRhr = payload.rhr;
    } 
    // Route B: Cloud API Aggregators (Oura, Fitbit, Whoop)
    else {
      if (!signature || !verifyHmacSignature(rawBody, signature, process.env.WEBHOOK_SECRET!)) {
        return NextResponse.json({ error: 'Cryptographic integrity failure' }, { status: 403 });
      }

      if (provider === 'whoop') {
        currentHrv = payload.recovery?.heart_rate_variability_rmssd;
        currentRhr = payload.recovery?.resting_heart_rate;
        providerUserId = payload.user_id;
      } else if (provider === 'oura') {
        currentHrv = payload.sleep?.rmssd;
        currentRhr = payload.sleep?.lowest_heart_rate;
        providerUserId = payload.user_id;
      }
    }

    if (!currentHrv || !currentRhr || !providerUserId) {
      return NextResponse.json({ status: 'Ignored: Insufficient telemetry data' }, { status: 200 });
    }

    // Execute core evaluation
    await evaluateSystemLoad(currentHrv, currentRhr, providerUserId, provider);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Ingestion Pipeline Fault:', error);
    return NextResponse.json({ error: 'Ingestion pipeline fault' }, { status: 500 });
  }
}

/**
 * Compares incoming telemetry against the user's baseline.
 * If thresholds are breached, autonomous defense is triggered and logged.
 */
async function evaluateSystemLoad(hrv: number, rhr: number, providerUserId: string, provider: string) {
  const { data: baseline } = await supabaseAdmin
    .from('user_baselines')
    .select('user_id, baseline_hrv, baseline_rhr, calendar_access_token')
    .eq('provider_user_id', providerUserId)
    .single();

  if (!baseline) return;

  const hrvDrop = (baseline.baseline_hrv - hrv) / baseline.baseline_hrv;
  const rhrSpike = (rhr - baseline.baseline_rhr) / baseline.baseline_rhr;

  // Threshold: >20% Drop in HRV OR >15% Spike in RHR triggers system
  if (hrvDrop > 0.20 || rhrSpike > 0.15) {
    const defense = await executeCalendarDefense(baseline.calendar_access_token);
    
    if (defense.success) {
      await supabaseAdmin.from('telemetry_calendar_defenses').insert({
        user_id: baseline.user_id,
        provider: provider,
        hrv_drop_percentage: parseFloat((hrvDrop * 100).toFixed(2)),
        rhr_spike_percentage: parseFloat((rhrSpike * 100).toFixed(2)),
        meetings_cleared: defense.clearedCount
      });
    }
  }
}
