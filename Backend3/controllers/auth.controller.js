import { User } from "../model/user.model.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js"
import { sanitizeUser } from "../utils/userUtils.js"
import { sendPasswordResetEmail } from "../utils/emailService.js"
import crypto from "crypto"

export const register = async (req, res) => {

    try {

        const { name, email, password } = req.body

        const existUser = await User.findOne({ email })

        if (existUser) {
            return res.status(400).json({ message: "User already exists." })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter valid Email." })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must contain atleast 8 characters." })
        }

        let hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            stripeCustomerId: null
        })

        let token = await genToken(user._id, user.role)

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production") ? "None" : "Lax",
            secure: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production"),
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(sanitizeUser(user))

    } catch (error) {

        return res.status(500).json({ message: `Register error ${error}` })

    }

}

export const login = async (req, res) => {
    try {

        let { email, password } = req.body

        let exitUser = await User.findOne({ email })

        if (!exitUser) {
            return res.status(400).json({ message: "User does not exist." })
        }

        const isMatch = await bcrypt.compare(password, exitUser.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password." })
        }

        let token = await genToken(exitUser._id, exitUser.role)

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production") ? "None" : "Lax",
            secure: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production"),
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(sanitizeUser(exitUser))

    } catch (error) {

        return res.status(500).json({ message: `Login error ${error}` })

    }
}

export const logOut = async (req, res) => {
    try {

        const isProd = (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production")
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: isProd ? "None" : "Lax",
            secure: isProd,
            path: "/"
        })

        return res.status(200).json({ message: "Logged Out successfully." })

    } catch (error) {
        return res.status(500).json({ message: `LogOut error ${error}` })
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist." })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password." })
        }

        if (user.role !== 'ADMIN') {
            return res.status(403).json({ message: "Forbidden. Admins only." })
        }

        const token = await genToken(user._id, user.role)

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production") ? "None" : "Lax",
            secure: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production"),
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            data: { email: user.email, role: user.role },
            success: true
        })

    } catch (error) {
        return res.status(500).json({ message: `Admin Login error ${error}` })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hash and set to user
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        // Create reset url
        // Determine the frontend URL based on the user's role or request origin
        // Ideally, this should be configurable or detected. 
        // For now, I'll assume the frontend URL. 
        // If the request comes from Admin panel (which might be on a different port), we might need to handle that.
        // However, the user is the same entity. 
        // Let's assume we redirect to the main frontend for now, or allow the client to send the base URL.
        // Or better, we can check a header or query param if it's admin.

        let frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        if (req.body.isAdmin) {
            frontendUrl = process.env.ADMIN_URL || 'http://localhost:5174';
        }

        const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

        try {
            await sendPasswordResetEmail(user.email, resetUrl, user.name);
            res.status(200).json({ success: true, message: "Email sent" });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return res.status(500).json({ message: "Email could not be sent" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        if (req.body.password.length < 8) {
            return res.status(400).json({ message: "Password must contain atleast 8 characters." })
        }

        user.password = await bcrypt.hash(req.body.password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ success: true, message: "Password updated success" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};