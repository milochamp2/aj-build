import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { saveOAuthTokens } from '@raindance-1/dashboard-core';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/settings?error=oauth_denied`
      );
    }

    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/settings?error=no_code`
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Exchange authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/settings?error=no_tokens`
      );
    }

    // Get user info to use as clientId
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    const clientId = userInfo.data.email || userInfo.data.id || 'default-user';

    // Save tokens using dashboard-core
    await saveOAuthTokens(
      clientId,
      'google',
      {
        access_token: tokens.access_token!,
        refresh_token: tokens.refresh_token!,
        expires_at: tokens.expiry_date ? Math.floor(tokens.expiry_date / 1000) : Math.floor(Date.now() / 1000) + 3600,
        scope: tokens.scope || undefined,
        token_type: tokens.token_type || undefined
      },
      userInfo.data.id || undefined,
      userInfo.data.email || undefined
    );

    // Redirect back to settings with success and email
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/settings?success=google_connected&email=${encodeURIComponent(clientId)}`
    );
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/settings?error=callback_failed`
    );
  }
}
