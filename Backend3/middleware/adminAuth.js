import jwt from "jsonwebtoken"

const adminAuth=async (req,res,next)=>{
    try{

        let {token}=req.cookies

        if(!token){
            return res.status(401).json({message:"Not Authorized. Login Again"})
        }

        let verifyToken= await jwt.verify(token,process.env.JWT_SECRET)

        if(!verifyToken){
            return res.status(401).json({message:"Not Authorized. Login Again, Invalid token."})
        }

        if(verifyToken.role !== 'ADMIN'){
            return res.status(403).json({message:"Forbidden. Admins only."})
        }

        req.userId = verifyToken.userId
        req.role = verifyToken.role
        
        next()


    }catch(error){
            return res.status(500).json({message:`Admin Authorization error ${error}`})

    }
   }

   export default adminAuth