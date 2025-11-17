import { User } from "../model/user.model.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js"
// import { TbWashDryP } from "react-icons/tb"

export const register=async(req,res)=>{
    
   try{

    const { name , email,password}=req.body

    //We have installed validator to validate email

    const existUser = await User.findOne({email})

    if(existUser){
        return res.status(400).json({message:"User already exists."})
    }

    //You're checking if the user's email is NOT valid.
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
    password:hashedPassword
   })

   let token = await genToken(user._id, user.role)

   {/*Now we are going to put token in cookie */}

   res.cookie("token", token, {
    httpOnly: true,
    sameSite: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production") ? "None" : "Lax",
    secure: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production"),
    maxAge: 7 * 24 * 60 * 60 * 1000
   })

 /*name → "token" → This is the name of the cookie.

value → token → This is the actual JWT token that we generated for authentication.

options → An object containing various settings for security and behavior.

 */

   return res.status(201).json(user)

   }catch(error){
    
    return res.status(500).json({message:`Register error ${error}`})
   
   } 

}

export const login=async(req,res)=>{
    try{

        let {email,password} = req.body


        //	You passed an object with email key and its value
        let exitUser = await User.findOne({email})

        if(!exitUser){
       return res.status(400).json({message:"User does not exist."})            
        }

/*
//  If user signed up using Google, block normal login (Disabled)
   if (exitUser.isGoogleAuth) {
     return res.status(400).json({
    message: "You signed up using Google. Please use Google login instead."
    });
  }        
*/     

        const isMatch = await bcrypt.compare(password,exitUser.password)

        if(!isMatch)
        {
         return res.status(400).json({message:"Incorrect Password."})            
        }


    {/*A new token will be generated whenever user register on logs in  */}
      let token = await genToken(exitUser._id, exitUser.role)

      {/*Now passing it to cookie */}

       res.cookie("token", token, {
        httpOnly: true,
        sameSite: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production") ? "None" : "Lax",
        secure: (process.env.NODE_ENV === "production" || process.env.NODE_ENVIRONMENT === "production"),
        maxAge: 7 * 24 * 60 * 60 * 1000
   })

   {/* Keep it in mind
    
    if you want to see user data then don't do this.

   return res.status(201).json("User Logged in successfully.",exitUser)    
    
The reason is that res.json() method accepts only one argument, which should be:
     1) A string, or
     2)An object, or
     30An array, etc.*/}
   return res.status(201).json(exitUser)

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



/*
export const googleLogin=async(req,res)=>{
    // Disabled: Email/password only
    return res.status(400).json({ message: "Google login is disabled." })
}
*/


export const adminLogin=async(req,res)=>{
    try{
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({message:"User does not exist."})
        }

        /*
        // Block admin google accounts (Disabled)
        if (user.isGoogleAuth) {
            return res.status(400).json({ message: "You signed up using Google. Please use Google login instead." })
        }
        */

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