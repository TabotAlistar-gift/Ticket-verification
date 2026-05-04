/**
 * Generates the HTML content for the ADMIN email (The Client).
 * This contains the sensitive 16-digit code and the image is attached.
 */
export const generateAdminEmail = (userEmail: string, ticketCode: string) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; padding: 40px 20px; background-color: #f1f5f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #0f172a; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;">Nouvelle Soumission de Ticket</h1>
      </div>
      
      <div style="padding: 40px 30px;">
        <div style="background-color: #fff1f2; border-radius: 12px; padding: 24px; border: 2px solid #fda4af; margin-bottom: 30px;">
          <span style="font-size: 12px; font-weight: 700; color: #e11d48; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 8px;">Code PIN Confidentiel</span>
          <span style="font-size: 28px; color: #be123c; font-weight: 900; font-family: monospace; letter-spacing: 0.15em;">${ticketCode}</span>
        </div>

        <div style="space-y: 16px;">
          <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 12px;">
            <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 4px;">Soumis par</span>
            <span style="font-size: 16px; color: #0f172a; font-weight: 600;">${userEmail}</span>
          </div>
          <div>
            <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 4px;">Statut</span>
            <span style="font-size: 14px; color: #059669; font-weight: 700; background-color: #ecfdf5; padding: 4px 8px; border-radius: 6px;">PRÊT POUR LA VÉRIFICATION</span>
          </div>
        </div>

        <p style="font-size: 14px; color: #94a3b8; margin-top: 40px; text-align: center; font-style: italic;">
          L'image du ticket a été jointe à cet email.
        </p>
      </div>
    </div>
  </div>
`;

/**
 * Generates the HTML content for the USER receipt email.
 * This is a professional "Thank You" note without the sensitive PIN.
 */
export const generateUserReceipt = () => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #334155; padding: 40px 20px; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #E30613; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800;">Vérification en cours</h1>
      </div>
      
      <div style="padding: 40px 30px; text-align: center;">
        <div style="width: 60px; height: 60px; background-color: #fef2f2; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px;">
          <span style="font-size: 30px;">⏳</span>
        </div>
        <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin-bottom: 16px;">Nous avons reçu votre ticket</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #64748b; margin-bottom: 24px;">
          Merci d'avoir soumis votre ticket pour vérification. Notre équipe examine actuellement les détails.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #64748b;">
          Vous recevrez un e-mail de confirmation finale une fois le processus terminé. Veuillez attendre de nouvelles mises à jour.
        </p>
      </div>
      
      <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="font-size: 12px; color: #94a3b8; margin: 0;">&copy; 2026 Portail de Vérification de Tickets. Sécurisé et Confidentiel.</p>
      </div>
    </div>
  </div>
`;
