import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  if (!clientId) {
    return NextResponse.redirect(
      `${appUrl}/login?error=google_not_configured`
    );
  }

  const redirectUri =
    `${appUrl}/api/auth/google/callback`;

  const googleUrl = new URL(
    "https://accounts.google.com/o/oauth2/v2/auth"
  );

  googleUrl.searchParams.set(
    "client_id",
    clientId
  );

  googleUrl.searchParams.set(
    "redirect_uri",
    redirectUri
  );

  googleUrl.searchParams.set(
    "response_type",
    "code"
  );

  googleUrl.searchParams.set(
    "scope",
    "openid email profile"
  );

  googleUrl.searchParams.set(
    "access_type",
    "offline"
  );

  googleUrl.searchParams.set(
    "prompt",
    "select_account"
  );

  return NextResponse.redirect(
    googleUrl.toString()
  );
}