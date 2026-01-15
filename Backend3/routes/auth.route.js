import express from "express"
import { adminLogin, login, logOut, register, forgotPassword, resetPassword } from "../controllers/auth.controller.js"
import { validate, signupSchema, loginSchema, adminLoginSchema } from "../validation/schema.js"

const authRouter = express.Router()

authRouter.post("/register", validate(signupSchema), register)
authRouter.post("/login", validate(loginSchema), login)
authRouter.post("/logout", logOut)
authRouter.post("/adminlogin", validate(adminLoginSchema), adminLogin)
authRouter.post("/forgot-password", forgotPassword)
authRouter.put("/reset-password/:resetToken", resetPassword)

export default authRouter