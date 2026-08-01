// src/app/api/webhooks/wearable/route.ts
import { getSupabase } from '@/lib/supabase';
import { verifyWebhookSignature } from '@/lib/security/crypto';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-biomesh-signature') || '';
    const webhookSecret = process.env.BIOMESH_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const rawBody = await request.text();
    const isValid = await verifyWebhookSignature(rawBody, signature, webhookSecret);

    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Unauthorized signature' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const eventData = JSON.parse(rawBody);
    const supabase = getSupabase();

    const normalizedPayload = {
      user_id: eventData.user_id,
      provider: eventData.provider || 'native_client',
      event_type: eventData.type || 'biometric_sync',
      heart_rate: eventData.heart_rate || null,
      hrv: eventData.hrv || null,
      stress_score: eventData.stress_score || null,
      payload: eventData,
    };

    const { error: dbError } = await supabase.from('webhook_events').insert(normalizedPayload);

    if (dbError) {
      console.error('Supabase persistence error:', dbError);
      return new Response(JSON.stringify({ error: 'Database write error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, sovereignty: 'maintained' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook processing failure:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
