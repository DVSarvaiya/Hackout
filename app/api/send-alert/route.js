import { NextResponse } from "next/server";
import { sendMail } from "@/lib/nodemailer";

export async function POST(req) {
  try {
    const { email, alertMessage, priority } = await req.json();

    // Validate inputs
    if (!email || !alertMessage) {
      return NextResponse.json(
        { success: false, error: "Email and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    console.log(`Sending alert to ${email} with priority ${priority || 'normal'}`);

    // Format HTML with better styling
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: ${priority === 3 ? '#ff4444' : priority === 2 ? '#ff8800' : '#ffaa00'}; 
                    color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">🌊 Coastal Alert Notification</h1>
        </div>
        <div style="padding: 20px; background-color: #f5f5f5;">
          <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; line-height: 1.6;">
${alertMessage}
          </pre>
        </div>
        <div style="padding: 20px; background-color: #333; color: white; text-align: center;">
          <p style="margin: 0;">This is an automated alert from the Coastal Alert System</p>
          <p style="margin: 5px 0 0 0; font-size: 12px;">Please do not reply to this email</p>
        </div>
      </div>
    `;

    await sendMail({
      to: email,
      subject: priority === 3 ? "🚨 URGENT: Coastal Danger Alert" : 
               priority === 2 ? "⚠️ Coastal Warning Alert" : 
               "🌊 Coastal Alert Notification",
      text: alertMessage,
      html: htmlContent,
    });

    console.log(`✅ Email sent successfully to ${email}`);

    return NextResponse.json({ 
      success: true, 
      message: "Email sent successfully",
      email: email 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    // Don't expose internal error details in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'Failed to send email';
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        email: req.body?.email 
      },
      { status: 500 }
    );
  }
}