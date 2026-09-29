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
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    const appUrl = (
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000"
    ).replace(/\/$/, "");

    console.log("GOOGLE CALLBACK");
    console.log("CALLBACK URL:", req.url);
    console.log("CODE EXISTS:", Boolean(code));
    console.log("GOOGLE ERROR:", error);

    // Google cancelled / rejected login
    if (error) {
      return NextResponse.redirect(
        `${appUrl}/login?error=google_cancelled`
      );
    }

    // Google did not send authorization code
    if (!code) {
      console.error(
        "GOOGLE CALLBACK ERROR: authorization code missing"
      );

      return NextResponse.redirect(
        `${appUrl}/login?error=google_code_missing`
      );
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret =
      process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error(
        "GOOGLE CLIENT ID / SECRET MISSING"
      );

      return NextResponse.redirect(
        `${appUrl}/login?error=google_not_configured`
      );
    }

    const redirectUri =
      `${appUrl}/api/auth/google/callback`;

    console.log(
      "TOKEN REDIRECT URI:",
      redirectUri
    );

    // --------------------------------
    // Exchange authorization code
    // --------------------------------

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
        "GOOGLE TOKEN ERROR:",
        errorText
      );

      return NextResponse.redirect(
        `${appUrl}/login?error=google_token_failed`
      );
    }

    const tokens =
      (await tokenResponse.json()) as GoogleTokenResponse;

    // --------------------------------
    // Get Google user
    // --------------------------------

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
        "GOOGLE USER INFO ERROR"
      );

      return NextResponse.redirect(
        `${appUrl}/login?error=google_user_failed`
      );
    }

    const googleUser =
      (await userResponse.json()) as GoogleUser;

    if (!googleUser.email) {
      return NextResponse.redirect(
        `${appUrl}/login?error=google_email_missing`
      );
    }

    const email = googleUser.email
      .trim()
      .toLowerCase();

    // --------------------------------
    // Find user
    // --------------------------------

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // --------------------------------
    // Create user
    // --------------------------------

    if (!user) {
      user = await prisma.user.create({
        data: {
          name:
            googleUser.name ||
            "Vistara User",

          email,

          password: null,

          role: "GUEST",
        },
      });
    }

    // --------------------------------
    // Create Vistara JWT
    // --------------------------------

    const token = createToken({
      userId: user.id,

      email: user.email,

      role: user.role as
        | "GUEST"
        | "HOST"
        | "GUIDE"
        | "ADMIN",
    });

    // --------------------------------
    // Login + redirect
    // --------------------------------

    const response = NextResponse.redirect(
      `${appUrl}/`
    );

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

    const appUrl = (
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000"
    ).replace(/\/$/, "");

    return NextResponse.redirect(
      `${appUrl}/login?error=google_login_failed`
    );
  }
}