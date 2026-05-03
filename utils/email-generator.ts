/**
 * Generates the HTML content for the verification email.
 * This is a plain string template to ensure compatibility with 
 * server-side environments without requiring react-dom/server.
 */
export const generateEmailHtml = (email: string, ticketCode: string) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #334155; padding: 40px 20px; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
      <div style="background-color: #E30613; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">Verification Summary</h1>
      </div>
      
      <div style="padding: 40px 30px;">
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">Hello,</p>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 32px;">Your ticket verification details have been processed. Please find the summary of your submission below:</p>
        
        <div style="background-color: #f1f5f9; border-radius: 12px; padding: 24px; border-left: 4px solid #005B9A;">
          <div style="margin-bottom: 16px;">
            <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Email Address</span>
            <span style="font-size: 16px; color: #0f172a; font-weight: 600;">${email}</span>
          </div>
          <div>
            <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">16-Digit PIN Code</span>
            <span style="font-size: 18px; color: #E30613; font-weight: 800; font-family: monospace; letter-spacing: 0.1em;">${ticketCode}</span>
          </div>
        </div>
        
        <p style="font-size: 14px; color: #94a3b8; margin-top: 32px; text-align: center;">
          This is an automated notification. Please do not reply to this email.
        </p>
      </div>
      
      <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="font-size: 12px; color: #64748b; margin: 0;">&copy; 2026 Ticket Verification Portal. Secure & Official.</p>
      </div>
    </div>
  </div>
`;
