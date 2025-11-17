import nodemailer from 'nodemailer'
import validator from 'validator'

export const submitContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email address" })
        }

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

        // Verify transporter configuration
        await transporter.verify()

        // Email content for business (where you receive inquiries)
        const businessEmailContent = {
            from: `"${name}" <${process.env.SMTP_USER}>`,
            replyTo: email, // So you can reply directly to the customer
            to: process.env.CONTACT_EMAIL || 'iasknoman156@gmail.com',
            subject: `Contact Form: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
                    <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>
                    <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #7c3aed; margin: 20px 0;">
                        <h3 style="color: #374151;">Message:</h3>
                        <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                        This email was sent from the IMK Autos contact form.
                    </p>
                </div>
            `
        }

        // Optional: Send confirmation email to customer
        const customerEmailContent = {
            from: `"IMK Autos" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Thank you for contacting IMK Autos',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #7c3aed;">Thank you for contacting us!</h2>
                    <p>Dear ${name},</p>
                    <p>We have received your message and will get back to you within 24 hours.</p>
                    <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Your message:</strong></p>
                        <p style="color: #4b5563;">${message}</p>
                    </div>
                    <p>Best regards,<br><strong>IMK Autos Team</strong></p>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                    <p style="color: #6b7280; font-size: 12px;">
                        Email: info@imkautos.co.uk | Phone: 07851 386 785
                    </p>
                </div>
            `
        }

        // Send email to business
        await transporter.sendMail(businessEmailContent)

        // Send confirmation email to customer (optional - can be removed if not needed)
        try {
            await transporter.sendMail(customerEmailContent)
        } catch (customerEmailError) {
            // Customer email failed silently - business email was sent successfully
        }

        return res.status(200).json({
            message: "Thank you for contacting us! We'll get back to you soon."
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to send message. Please try again later or contact us directly at info@imkautos.co.uk"
        })
    }
}

