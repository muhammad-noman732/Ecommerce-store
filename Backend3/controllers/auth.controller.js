import { User } from "../model/user.model.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js"
import { sanitizeUser } from "../utils/userUtils.js"

export const register=async(req,res)=>{
    
   try{

    const { name , email,password}=req.body

    const existUser = await User.findOne({email})

    if(existUser){
        return res.status(400).json({message:"User already exists."})
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({message:"Enter valid Email."})   
    }

    if(password.length < 8){
        return res.status(400).json({message:"Password must contain atleast 8 characters."})
    }  
    
   let hashedPassword = await bcrypt.hash(password,10) 
   
   const user= await User.create({
    name,
    email,
    password:hashedPassword,
    stripeCustomerId:null
   })

   let token = await genToken(user._id, user.role)

   res.cookie("token", token, {
    httpOnly: true,
    sameSite: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production") ? "None" : "Lax",
    secure: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production"),
    maxAge: 7 * 24 * 60 * 60 * 1000
   })

   return res.status(201).json(sanitizeUser(user))

   }catch(error){
    
    return res.status(500).json({message:`Register error ${error}`})
   
   } 

}

export const login=async(req,res)=>{
    try{

        let {email,password} = req.body

        let exitUser = await User.findOne({email})

        if(!exitUser){
       return res.status(400).json({message:"User does not exist."})            
        }

        const isMatch = await bcrypt.compare(password,exitUser.password)

        if(!isMatch)
        {
         return res.status(400).json({message:"Incorrect Password."})            
        }

      let token = await genToken(exitUser._id, exitUser.role)

       res.cookie("token", token, {
        httpOnly: true,
        sameSite: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production") ? "None" : "Lax",
        secure: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production"),
        maxAge: 7 * 24 * 60 * 60 * 1000
   })

   return res.status(201).json(sanitizeUser(exitUser))

    }catch(error){
    
    return res.status(500).json({message:`Login error ${error}`})       

    }
}

export const logOut = async(req,res)=>{
    try{

        const isProd = (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production")
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: isProd ? "None" : "Lax",
            secure: isProd,
            path: "/"
        })

        return res.status(200).json({message:"Logged Out successfully."})       

    }catch(error)
    {
        return res.status(500).json({message:`LogOut error ${error}`})
    }
}

export const adminLogin=async(req,res)=>{
    try{
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({message:"User does not exist."})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect Password."})
        }

        if(user.role !== 'ADMIN'){
            return res.status(403).json({message:"Forbidden. Admins only."})
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

    }catch(error){
        return res.status(500).json({message:`Admin Login error ${error}`})
    }
}