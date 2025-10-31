
import jwt from "jsonwebtoken"

export const genToken = async (userId, role) => {
    try {
        const payload = { userId, role };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" })
        return token
    } catch (error) {
        console.log("GenToken error", error)
    }
}

export const genToken1 = async (email) => {
    try {
        const token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" })
        return token
    } catch (error) {
        console.log("GenToken1 error", error)
    }
}