import { Resend } from 'resend';

// Helper to get fresh config when needed
const getConfig = () => {
  const apiKey = process.env.RESEND_API_KEY;
  const resend = apiKey ? new Resend(apiKey) : null;

  return {
    resend,
    FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    FROM_NAME: process.env.RESEND_FROM_NAME,
    TO_EMAIL: process.env.RESEND_TO_EMAIL
  };
};

export const sendOrderConfirmationEmail = async (orderData, userData) => {
  try {
    const { resend, FROM_EMAIL, FROM_NAME } = getConfig();
    const { items, amount, address, paymentMethod, status, _id } = orderData;
    const { name, email } = userData;

    if (!resend || !FROM_EMAIL || !FROM_NAME) return false;

    const itemsList = items.map((item, index) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${index + 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.name || item.title || 'Product'}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.quantity || 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">£${(item.price || 0).toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">£${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
      </tr>
    `).join('');

    const paymentStatusText = paymentMethod === 'Stripe' ? 'Paid' : 'Cash on Delivery';
    const paymentStatusColor = paymentMethod === 'Stripe' ? '#10b981' : '#f59e0b';

    await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: email,
      subject: `Order Confirmation - Order #${_id.toString().slice(-8)}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #7c3aed; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">${FROM_NAME}</h1>
            <p style="margin: 5px 0 0 0;">Order Confirmation</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px;">
            <p>Dear ${name},</p>
            <p>Thank you for your order! We have received your order and will process it shortly.</p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #7c3aed; margin-top: 0;">Order Details</h2>
              <p><strong>Order ID:</strong> #${_id.toString().slice(-8)}</p>
              <p><strong>Order Status:</strong> <span style="color: #7c3aed; font-weight: bold;">${status}</span></p>
              <p><strong>Payment Method:</strong> <span style="color: ${paymentStatusColor}; font-weight: bold;">${paymentMethod}</span></p>
              <p><strong>Payment Status:</strong> <span style="color: ${paymentStatusColor}; font-weight: bold;">${paymentStatusText}</span></p>
            </div>

            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Order Items</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #f3f4f6;">
                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #e5e7eb;">#</th>
                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #e5e7eb;">Product</th>
                    <th style="padding: 10px; text-align: center; border-bottom: 2px solid #e5e7eb;">Qty</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #e5e7eb;">Price</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #e5e7eb;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsList}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4" style="padding: 15px 10px; text-align: right; font-weight: bold; border-top: 2px solid #e5e7eb;">Total Amount:</td>
                    <td style="padding: 15px 10px; text-align: right; font-weight: bold; font-size: 18px; color: #7c3aed; border-top: 2px solid #e5e7eb;">£${amount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Delivery Address</h3>
              <p style="margin: 5px 0;">${address.street || ''}</p>
              <p style="margin: 5px 0;">${address.city || ''}, ${address.state || ''}</p>
              <p style="margin: 5px 0;">${address.zipCode || ''}</p>
              ${address.country ? `<p style="margin: 5px 0;">${address.country}</p>` : ''}
            </div>

            <p>We will send you another email once your order has been shipped.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
              <p><strong>${FROM_NAME}</strong></p>
              <p>Email: ${FROM_EMAIL}</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const sendOrderNotificationToBusiness = async (orderData, userData) => {
  try {
    const { resend, FROM_EMAIL, FROM_NAME, TO_EMAIL } = getConfig();
    const { items, amount, address, paymentMethod, status, _id, date } = orderData;
    const { name, email } = userData;

    if (!resend || !FROM_EMAIL || !FROM_NAME || !TO_EMAIL) return false;

    const itemsList = items.map((item, index) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${index + 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.name || item.title || 'Product'}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.quantity || 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">£${(item.price || 0).toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">£${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
      </tr>
    `).join('');

    const orderDate = new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    await resend.emails.send({
      from: `${FROM_NAME} Order System <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      reply_to: email, // Valid Resend property is reply_to
      subject: `New Order Received - Order #${_id.toString().slice(-8)}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">New Order Received</h1>
            <p style="margin: 5px 0 0 0;">Order #${_id.toString().slice(-8)}</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px;">
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #10b981; margin-top: 0;">Customer Information</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Order Date:</strong> ${orderDate}</p>
              <p><strong>Order Status:</strong> <span style="color: #7c3aed; font-weight: bold;">${status}</span></p>
              <p><strong>Payment Method:</strong> ${paymentMethod}</p>
            </div>

            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Order Items</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #f3f4f6;">
                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #e5e7eb;">#</th>
                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #e5e7eb;">Product</th>
                    <th style="padding: 10px; text-align: center; border-bottom: 2px solid #e5e7eb;">Qty</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #e5e7eb;">Price</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #e5e7eb;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsList}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4" style="padding: 15px 10px; text-align: right; font-weight: bold; border-top: 2px solid #e5e7eb;">Total Amount:</td>
                    <td style="padding: 15px 10px; text-align: right; font-weight: bold; font-size: 18px; color: #10b981; border-top: 2px solid #e5e7eb;">£${amount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Delivery Address</h3>
              <p style="margin: 5px 0;">${address.street || ''}</p>
              <p style="margin: 5px 0;">${address.city || ''}, ${address.state || ''}</p>
              <p style="margin: 5px 0;">${address.zipCode || ''}</p>
              ${address.country ? `<p style="margin: 5px 0;">${address.country}</p>` : ''}
            </div>

            <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
              This is an automated notification from the ${FROM_NAME} order system.
            </p>
          </div>
        </body>
        </html>
      `
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const sendContactFormEmail = async (contactData) => {
  try {
    const { resend, FROM_EMAIL, FROM_NAME, TO_EMAIL } = getConfig();
    const { name, email, phone, subject, message, serviceRequired } = contactData;

    if (!resend || !FROM_EMAIL || !FROM_NAME || !TO_EMAIL) return false;

    await resend.emails.send({
      from: `${FROM_NAME} Contact Form <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      reply_to: email,
      subject: `Contact Form: ${subject || 'No Subject'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #7c3aed; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
            <p style="margin: 5px 0 0 0;">${FROM_NAME}</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px;">
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #7c3aed; margin-top: 0;">Contact Information</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
              ${serviceRequired ? `<p><strong>Service Required:</strong> ${serviceRequired}</p>` : ''}
              ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            </div>
            
            <div style="background-color: white; padding: 20px; border-left: 4px solid #7c3aed; margin: 20px 0; border-radius: 8px;">
              <h3 style="color: #374151; margin-top: 0;">Message:</h3>
              <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>

            <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
              This email was sent from the ${FROM_NAME} contact form. You can reply directly to this email to respond to ${name}.
            </p>
          </div>
        </body>
        </html>
      `
    });

    return true;
  } catch (error) {
    throw error;
  }
};

export const sendContactConfirmationEmail = async (contactData) => {
  try {
    const { resend, FROM_EMAIL, FROM_NAME } = getConfig();
    const { name, email, message } = contactData;

    if (!resend || !FROM_EMAIL || !FROM_NAME) return false;

    await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: email,
      subject: `Thank you for contacting ${FROM_NAME}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #7c3aed; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Thank you for contacting us!</h1>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px;">
            <p>Dear ${name},</p>
            <p>We have received your message and will get back to you within 24 hours.</p>
            
            <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Your message:</strong></p>
              <p style="color: #4b5563;">${message}</p>
            </div>
            
            <p>Best regards,<br><strong>${FROM_NAME} Team</strong></p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <div style="text-align: center; color: #6b7280; font-size: 12px;">
              <p><strong>${FROM_NAME}</strong></p>
              <p>Email: ${FROM_EMAIL}</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    return true;
  } catch (error) {
    return false;
  }
};
