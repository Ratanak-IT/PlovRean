import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Knea-Learn contact Form <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!, // your admin email
      subject: `📩 New Contact Message: ${subject}`,
      replyTo: email, 
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Message from ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="padding: 12px; background: #f7f7f7; border-radius: 6px;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
        </div>
      `
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
