import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/auth";

type GoogleTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: string;
  id_token?: string;
};

type GoogleUser = {
  sub: string;
  name?: string;
  email: string;
  picture?: string;
  email_verified?: boolean;
};

export async function GET(req: Request) {
  const appUrl = (
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");

  try {
    const url = new URL(req.url);

    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    /*
    |--------------------------------------------------------------------------
    | Google cancelled login
    |--------------------------------------------------------------------------
    */

    if (error) {
      return NextResponse.redirect(
        `${appUrl}/login?error=google_cancelled`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Authorization code
    |--------------------------------------------------------------------------
    */

    if (!code) {
      return NextResponse.redirect(
        `${appUrl}/login?error=google_code_missing`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | OAuth STATE validation
    |--------------------------------------------------------------------------
    */

    const returnedState = url.searchParams.get("state");

    const cookieHeader = req.headers.get("cookie") || "";

    const storedState = cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) =>
        cookie.startsWith("google_oauth_state=")
      )
      ?.split("=")
      .slice(1)
      .join("=");

    if (
      !returnedState ||
      !storedState ||
      returnedState !== storedState
    ) {
      console.error("GOOGLE_STATE_VALIDATION_FAILED");

      return NextResponse.redirect(
        `${appUrl}/login?error=google_state_invalid`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Google credentials
    |--------------------------------------------------------------------------
    */

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret =
      process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error(
        "GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET missing"
      );

      return NextResponse.redirect(
        `${appUrl}/login?error=google_not_configured`
      );
    }

    const redirectUri =
      `${appUrl}/api/auth/google/callback`;

    /*
    |--------------------------------------------------------------------------
    | Exchange authorization code
    |--------------------------------------------------------------------------
    */

    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorText =
        await tokenResponse.text();

      console.error(
        "GOOGLE_TOKEN_ERROR:",
        errorText
      );

      return NextResponse.redirect(
        `${appUrl}/login?error=google_token_failed`
      );
    }

    const tokens =
      (await tokenResponse.json()) as GoogleTokenResponse;

    if (!tokens.access_token) {
      return NextResponse.redirect(
        `${appUrl}/login?error=google_access_token_missing`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Get Google user
    |--------------------------------------------------------------------------
    */

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization:
            `Bearer ${tokens.access_token}`,
        },
      }
    );

    if (!userResponse.ok) {
      console.error(
        "GOOGLE_USER_INFO_ERROR"
      );

      return NextResponse.redirect(
        `${appUrl}/login?error=google_user_failed`
      );
    }

    const googleUser =
      (await userResponse.json()) as GoogleUser;

    /*
    |--------------------------------------------------------------------------
    | Validate Google account
    |--------------------------------------------------------------------------
    */

    if (!googleUser.email) {
      return NextResponse.redirect(
        `${appUrl}/login?error=google_email_missing`
      );
    }

    if (googleUser.email_verified === false) {
      return NextResponse.redirect(
        `${appUrl}/login?error=google_email_not_verified`
      );
    }

    const email = googleUser.email
      .trim()
      .toLowerCase();

    /*
    |--------------------------------------------------------------------------
    | Find existing user
    |--------------------------------------------------------------------------
    */

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    /*
    |--------------------------------------------------------------------------
    | Create user
    |--------------------------------------------------------------------------
    */

    if (!user) {
      user = await prisma.user.create({
        data: {
          name:
            googleUser.name?.trim() ||
            "Vistara User",

          email,

          password: null,

          role: "GUEST",
        },
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Create Vistara JWT
    |--------------------------------------------------------------------------
    */

    const token = createToken({
      userId: user.id,

      email: user.email,

      role: user.role as
        | "GUEST"
        | "HOST"
        | "GUIDE"
        | "ADMIN",
    });

    /*
    |--------------------------------------------------------------------------
    | Login response
    |--------------------------------------------------------------------------
    */

    const response = NextResponse.redirect(
      `${appUrl}/`
    );

    /*
    | Vistara authentication cookie
    */

    response.cookies.set({
      name: "vistara_token",

      value: token,

      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      maxAge: 60 * 60 * 24 * 7,

      path: "/",
    });

    /*
    | Remove OAuth state cookie
    */

    response.cookies.set({
      name: "google_oauth_state",

      value: "",

      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      maxAge: 0,

      path: "/",
    });

    console.log(
      "GOOGLE LOGIN SUCCESS:",
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "GOOGLE_LOGIN_ERROR:",
      error
    );

    return NextResponse.redirect(
      `${appUrl}/login?error=google_login_failed`
    );
  }
}