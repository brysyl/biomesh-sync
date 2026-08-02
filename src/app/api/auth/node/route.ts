import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { provider } = await request.json();
    const supabase = createRouteHandlerClient({ cookies });

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized node connection attempt.' }, { status: 401 });
    }

    let authUrl = '';
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/${provider}`;

    switch (provider) {
      case 'oura':
        authUrl = `https://cloud.ouraring.com/oauth/authorize?client_id=${process.env.OURA_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=daily workout heartrate sleep`;
        break;
      case 'whoop':
        authUrl = `https://api.prod.whoop.com/oauth/oauth2/auth?client_id=${process.env.WHOOP_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=read:recovery read:cycles`;
        break;
      case 'fitbit':
        authUrl = `https://www.fitbit.com/oauth2/authorize?client_id=${process.env.FITBIT_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=activity heartrate sleep`;
        break;
      case 'mock':
        // Developer Bypass: Seeds a local baseline directly for testing the engine without hardware
        await supabaseAdmin.from('user_baselines').upsert({
          user_id: session.user.id,
          provider_user_id: `mock_node_${session.user.id}`,
          baseline_hrv: 65.0,
          baseline_rhr: 52.0,
          calendar_access_token: 'mock_calendar_token_active'
        }, { onConflict: 'provider_user_id' });

        return NextResponse.json({ success: true, mockInitialized: true }, { status: 200 });
      default:
        return NextResponse.json({ error: 'Unsupported biometric provider node.' }, { status: 400 });
    }

    return NextResponse.json({ success: true, authUrl }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
