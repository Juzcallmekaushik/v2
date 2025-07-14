import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function createEmailTemplate(name: string, email: string, message: string): string {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Project Inquiry</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f7f8fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f8fc; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); overflow: hidden;">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">New Project Inquiry</h1>
                  <p style="margin: 12px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 18px;">You have a new message from your portfolio</p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <!-- Name -->
                  <div style="margin-bottom: 10px;">
                    <p style="margin: 0 0 5px 0; font-size: 14px; color: #2d3748; font-weight: 700;">Name</p>
                    <p style="margin: 0; font-size: 16px; color: #4a5568;">${name}</p>
                  </div>
                  
                  <!-- Email -->
                  <div style="margin-bottom: 10px;">
                    <p style="margin: 0 0 5px 0; font-size: 14px; color: #2d3748; font-weight: 700;">Email</p>
                    <p style="margin: 0; font-size: 16px; color: #4a5568;">
                      <a href="mailto:${email}" style="color: #4299e1; text-decoration: none;">${email}</a>
                    </p>
                  </div>
                  
                  <!-- Project Details -->
                  <div style="margin-bottom: 20px;">
                    <p style="margin: 0 0 5px 0; font-size: 14px; color: #2d3748; font-weight: 700;">Project Details</p>
                    <p style="margin: 0; font-size: 16px; color: #4a5568; white-space: pre-wrap; line-height: 1.6;">${message}</p>
                  </div>

                  <!-- Call to Action -->
                  <div style="text-align: center; margin: 35px 0; padding: 30px; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); border-radius: 12px;">
                    <p style="margin: 0 0 20px 0; color: #4a5568; font-size: 16px; font-weight: 500;">Ready to respond?</p>
                    <a href="mailto:${email}?subject=Re:%20Project%20Inquiry&body=Hi%20${name},%0D%0A%0D%0AThank%20you%20for%20reaching%20out!" 
                       style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      Reply to ${name}
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f7fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #718096; font-size: 14px;">
                    Sent via contact form on <a href="https://kaushikreddy.me" style="color: #667eea; text-decoration: none; font-weight: 600;">kaushikreddy.me</a>
                  </p>
                  <p style="margin: 10px 0 0 0; color: #a0aec0; font-size: 12px;">${currentDate}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  let name: string | undefined;
  let email: string | undefined;
  let message: string | undefined;

  try {
    const formData = await request.formData();
    name = formData.get("name") as string;
    email = formData.get("email") as string;
    message = formData.get("message") as string;

    if (!name || !email || !message) {
      return json({ error: "All fields are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return json({ error: "Invalid email format" }, { status: 400 });
    }

    const emailResult = await resend.emails.send({
      from: "contact@kaushikreddy.me",
      to: "kaushikreddy1206@gmail.com",
      subject: `New Project Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: createEmailTemplate(name, email, message),
    });

    if (emailResult.error) {
      console.error("Resend API error:", emailResult.error);
      return json({ error: "Failed to send email" }, { status: 500 });
    }

    return json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      formData: { name, email, messageLength: message?.length }
    });
    return json({ error: "Failed to send email" }, { status: 500 });
  }
}
