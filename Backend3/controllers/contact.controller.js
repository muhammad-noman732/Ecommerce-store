import validator from 'validator'
import { sendContactFormEmail, sendContactConfirmationEmail } from '../utils/emailService.js'

export const submitContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email address" })
        }

        // Send email to business (info@imkautos.co.uk)
        await sendContactFormEmail({ name, email, phone, subject, message })

        // Send confirmation email to customer (optional - non-blocking)
        sendContactConfirmationEmail({ name, email, message }).catch(err => 
            console.error('Failed to send contact confirmation to customer:', err)
        )

        return res.status(200).json({
            message: "Thank you for contacting us! We'll get back to you soon."
        })

    } catch (error) {
        console.error('Error in contact form submission:', error);
        return res.status(500).json({
            message: "Failed to send message. Please try again later or contact us directly at info@imkautos.co.uk"
        })
    }
}

