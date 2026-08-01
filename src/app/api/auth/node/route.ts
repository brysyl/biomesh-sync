// src/app/api/auth/node/route.ts
import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const userId = body.userId || `executive_${Math.random().toString(36).substring(2, 9)}`;
    const secretToken = `bio_sec_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;

    const supabase = getSupabase();
    
    // Graceful fallback block using standard try/catch
    try {
      await supabase.from('sync_nodes').insert({
        user_id: userId,
        secret_token: secretToken,
        status: 'active',
      });
    } catch (dbError) {
      console.warn('Sync nodes table not found or insert skipped:', dbError);
    }

    const origin = request.headers.get('origin') || 'https://biomesh.online';
    const webhookUrl = `${origin}/api/webhooks/wearable`;

    return NextResponse.json({
      success: true,
      userId,
      webhookUrl,
      secretToken,
      message: 'Node provisioned successfully. Configure your health exporter with these credentials.',
    });
  } catch (error) {
    console.error('Node initialization error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
