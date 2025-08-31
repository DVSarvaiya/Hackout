import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: `"Coastal Alert System" <${process.env.EMAIL_ADDRESS}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};
