import { getSupabase } from '@/lib/supabase';
import { verifyTerraSignature } from '@/lib/security/crypto';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const signatureHeader = request.headers.get('terra-signature') || '';
    const webhookSecret = process.env.TERRA_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('Missing TERRA_WEBHOOK_SECRET configuration.');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse Terra signature header (Format: t=<timestamp>,v1=<signature>)
    const elements = signatureHeader.split(',');
    const timestamp = elements.find((el) => el.startsWith('t='))?.split('=')[1];
    const v1Sig = elements.find((el) => el.startsWith('v1='))?.split('=')[1];

    if (!timestamp || !v1Sig) {
      return new Response(JSON.stringify({ error: 'Invalid signature headers' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const rawBody = await request.text();
    const signedPayload = `${timestamp}.${rawBody}`;

    // Verify HMAC signature securely on the Edge runtime
    const isValid = await verifyTerraSignature(signedPayload, v1Sig, webhookSecret);
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Unauthorized signature' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const eventData = JSON.parse(rawBody);
    const supabase = getSupabase();

    // Persist webhook payload data to Supabase
    const { error: dbError } = await supabase.from('webhook_events').insert({
      user_id: eventData.user?.user_id,
      type: eventData.type,
      payload: eventData,
    });

    if (dbError) {
      console.error('Supabase write error:', dbError);
      return new Response(JSON.stringify({ error: 'Database persistence error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook execution failure:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
