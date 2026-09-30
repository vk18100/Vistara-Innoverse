import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

if (!emailUser) {
  throw new Error("EMAIL_USER is missing");
}

if (!emailPassword) {
  throw new Error("EMAIL_PASSWORD is missing");
}

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
) {
  await transporter.sendMail({
    from: `"Vistara" <${emailUser}>`,
    to: email,

    subject: "Reset your Vistara password",

    text: `
Hello,

We received a request to reset your Vistara account password.

Use the link below to create a new password:

${resetUrl}

This link will expire in 30 minutes.

If you did not request a password reset, you can safely ignore this email.

Regards,
Vistara Team
`,

    html: `
      <div style="
        margin:0;
        padding:40px 20px;
        background:#f8fafc;
        font-family:Arial,Helvetica,sans-serif;
      ">
        <div style="
          max-width:560px;
          margin:0 auto;
          background:#ffffff;
          border-radius:16px;
          padding:40px;
          border:1px solid #e2e8f0;
        ">

          <div style="
            text-align:center;
            margin-bottom:30px;
          ">
            <h1 style="
              margin:0;
              color:#03045E;
              font-size:30px;
            ">
              Vistara
            </h1>

            <p style="
              margin:8px 0 0;
              color:#64748B;
              font-size:14px;
            ">
              Travel. Stay. Experience.
            </p>
          </div>

          <h2 style="
            color:#111827;
            font-size:22px;
            margin-bottom:12px;
          ">
            Reset your password
          </h2>

          <p style="
            color:#64748B;
            font-size:15px;
            line-height:1.7;
          ">
            We received a request to reset your Vistara
            account password.
          </p>

          <div style="
            text-align:center;
            margin:32px 0;
          ">
            <a
              href="${resetUrl}"
              style="
                display:inline-block;
                padding:14px 28px;
                background:#03045E;
                color:#ffffff;
                text-decoration:none;
                border-radius:10px;
                font-size:14px;
                font-weight:600;
              "
            >
              Reset Password
            </a>
          </div>

          <p style="
            color:#64748B;
            font-size:13px;
            line-height:1.6;
          ">
            This password reset link will expire in
            <strong>30 minutes</strong>.
          </p>

          <p style="
            color:#64748B;
            font-size:13px;
            line-height:1.6;
          ">
            If you did not request this password reset,
            you can safely ignore this email.
          </p>

          <div style="
            margin-top:32px;
            padding-top:20px;
            border-top:1px solid #E2E8F0;
            text-align:center;
          ">
            <p style="
              margin:0;
              color:#94A3B8;
              font-size:12px;
            ">
              © Vistara. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    `,
  });
}