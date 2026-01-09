import { z } from "zod"

export const signupSchema = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const loginSchema = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const adminLoginSchema = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const contactSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Invalid email address"),
    phone: z.string().optional(),
    serviceRequired: z.string().optional(),
    subject: z.string().trim().min(5, "Subject must be at least 5 characters").optional(),
    message: z.string().trim().min(10, "Message must be at least 10 characters")
})

export const validate = (schema) => (req, res, next) => {
    try {
        const result = schema.safeParse(req.body)
        if (!result.success) {
            const issues = result.error.issues.map(i => ({ path: i.path.join('.'), message: i.message }))
            return res.status(400).json({ message: "Validation failed", errors: issues })
        }
        // assign parsed data to ensure sanitized values
        req.body = result.data
        return next()
    } catch (err) {
        return res.status(400).json({ message: "Invalid request payload" })
    }
}


