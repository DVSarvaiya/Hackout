import { NextResponse } from "next/server";
import { sendMail } from "@/lib/nodemailer";

export async function POST(req) {
  try {
    const { email, alertMessage } = await req.json();

    await sendMail({
      to: email,
      subject: "🌊 Coastal Alert Notification",
      text: alertMessage,
      html: `<p><b>Alert:</b> ${alertMessage}</p>`,
    });

    return NextResponse.json({ success: true, message: "Email sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
