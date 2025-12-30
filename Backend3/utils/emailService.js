import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const FROM_EMAIL = 'info@imkautos.co.uk';
const TO_EMAIL = 'info@imkautos.co.uk';

/**
 * Send order confirmation email to customer
 * @param {Object} orderData - Order information
 * @param {Object} userData - User information
 */
export const sendOrderConfirmationEmail = async (orderData, userData) => {
  try {
    const { items, amount, address, paymentMethod, status, _id } = orderData;
    const { name, email } = userData;

    // Format order items
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

    const msg = {
      to: email,
      from: {
        email: FROM_EMAIL,
        name: 'IMK Autos'
      },
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
            <h1 style="margin: 0;">IMK Autos</h1>
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
              <p><strong>IMK Autos</strong></p>
              <p>Email: info@imkautos.co.uk</p>
              <p>Phone: 07851 386 785</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await sgMail.send(msg);
    console.log('Order confirmation email sent to:', email);
    return true;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    // Don't throw error - email failure shouldn't break order creation
    return false;
  }
};

/**
 * Send order notification email to business (info@imkautos.co.uk)
 * @param {Object} orderData - Order information
 * @param {Object} userData - User information
 */
export const sendOrderNotificationToBusiness = async (orderData, userData) => {
  try {
    const { items, amount, address, paymentMethod, status, _id, date } = orderData;
    const { name, email } = userData;

    // Format order items
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

    const msg = {
      to: TO_EMAIL,
      from: {
        email: FROM_EMAIL,
        name: 'IMK Autos Order System'
      },
      replyTo: email,
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
              This is an automated notification from the IMK Autos order system.
            </p>
          </div>
        </body>
        </html>
      `
    };

    await sgMail.send(msg);
    console.log('Order notification email sent to business');
    return true;
  } catch (error) {
    console.error('Error sending order notification email to business:', error);
    return false;
  }
};

/**
 * Send contact form submission email to business
 * @param {Object} contactData - Contact form data
 */
export const sendContactFormEmail = async (contactData) => {
  try {
    const { name, email, phone, subject, message } = contactData;

    const msg = {
      to: TO_EMAIL,
      from: {
        email: FROM_EMAIL,
        name: 'IMK Autos Contact Form'
      },
      replyTo: email,
      subject: `Contact Form: ${subject}`,
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
            <p style="margin: 5px 0 0 0;">IMK Autos</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px;">
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #7c3aed; margin-top: 0;">Contact Information</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background-color: white; padding: 20px; border-left: 4px solid #7c3aed; margin: 20px 0; border-radius: 8px;">
              <h3 style="color: #374151; margin-top: 0;">Message:</h3>
              <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>

            <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
              This email was sent from the IMK Autos contact form. You can reply directly to this email to respond to ${name}.
            </p>
          </div>
        </body>
        </html>
      `
    };

    await sgMail.send(msg);
    console.log('Contact form email sent to business');
    return true;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw error; // Throw error so controller can handle it
  }
};

/**
 * Send contact form confirmation email to customer
 * @param {Object} contactData - Contact form data
 */
export const sendContactConfirmationEmail = async (contactData) => {
  try {
    const { name, email, message } = contactData;

    const msg = {
      to: email,
      from: {
        email: FROM_EMAIL,
        name: 'IMK Autos'
      },
      subject: 'Thank you for contacting IMK Autos',
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
            
            <p>Best regards,<br><strong>IMK Autos Team</strong></p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <div style="text-align: center; color: #6b7280; font-size: 12px;">
              <p><strong>IMK Autos</strong></p>
              <p>Email: info@imkautos.co.uk</p>
              <p>Phone: 07851 386 785</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await sgMail.send(msg);
    console.log('Contact confirmation email sent to customer');
    return true;
  } catch (error) {
    console.error('Error sending contact confirmation email:', error);
    // Don't throw - this is optional
    return false;
  }
};

