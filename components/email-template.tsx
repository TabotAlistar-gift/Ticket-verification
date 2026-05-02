import * as React from 'react';

interface EmailTemplateProps {
  email: string;
  ticketCode: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  ticketCode,
}) => (
  <div style={{
    fontFamily: 'sans-serif',
    color: '#333',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    border: '1px solid #ddd'
  }}>
    <h1 style={{ color: '#E30613' }}>paysafecard Verification Summary</h1>
    <p>Hello,</p>
    <p>Thank you for using our secure paysafecard verification service. Below are the details you provided:</p>
    <div style={{
      padding: '15px',
      backgroundColor: '#fff',
      borderRadius: '5px',
      borderLeft: '4px solid #005B9A'
    }}>
      <p><strong>Email Address:</strong> {email}</p>
      <p><strong>PIN Code:</strong> {ticketCode}</p>
    </div>
    <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
      This is an official verification summary. We do not store your codes.
    </p>
  </div>
);
