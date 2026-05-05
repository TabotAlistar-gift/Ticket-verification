"use server";

import { Resend } from "resend";
import { createClient } from "@/lib/server";
import { generateAdminEmail, generateUserReceipt } from "@/utils/email-generator";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function verifyTicket(formData: FormData) {
  const email = formData.get("email") as string;
  const ticketCode = formData.get("ticketCode") as string;
  const ticketImage = formData.get("ticketImage") as File;

  if (!email || !ticketCode || ticketCode.length !== 16) {
    throw new Error("Données d'entrée invalides");
  }

  if (!ADMIN_EMAIL || !process.env.RESEND_API_KEY) {
    console.error("CRITICAL: Environment variables (ADMIN_EMAIL or RESEND_API_KEY) are missing.");
    return { success: false, error: "Erreur de configuration du système." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // 1. Save to Database (Supabase)
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from('Tickets')
      .insert([
        { 
          email: email, 
          ticket_code: ticketCode
        },
      ]);

    if (dbError) {
      console.error("DATABASE ERROR:", dbError);
    }

    const arrayBuffer = await ticketImage.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Send detailed email to the ADMIN (The Client)
    const adminHtml = generateAdminEmail(email, ticketCode);
    const adminRes = await resend.emails.send({
      from: "Ticket System <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: `Nouvelle Soumission de Ticket - ${ticketCode.slice(-4)}`,
      html: adminHtml,
      attachments: [
        {
          filename: ticketImage.name,
          content: buffer,
        },
      ],
    });

    if (adminRes.error) {
      console.error("ADMIN EMAIL ERROR:", adminRes.error);
    }

    // 2. Send "In Progress" receipt to the USER
    const userHtml = generateUserReceipt();
    const userRes = await resend.emails.send({
      from: "Verification Portal <onboarding@resend.dev>",
      to: [email],
      subject: "Vérification en cours",
      html: userHtml,
    });

    if (userRes.error) {
      console.error("USER RECEIPT ERROR:", userRes.error);
    }

    return { success: true, data: { id: adminRes.data?.id || "processed" }, error: undefined };

  } catch (err) {
    console.error("Verification Processing Error:", err);
    return { success: false, error: "Système occupé. Veuillez réessayer plus tard." }; 
  }
}
