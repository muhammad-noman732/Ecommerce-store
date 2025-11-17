import jwt from "jsonwebtoken"

const isAuth=async(req,res,next)=>{

    {/*isAuth is a middleware function that protects routes by checking if the user is logged in (authenticated).

     What It Does:
     Gets the JWT token from req.cookies.

     Verifies it using your secret key.

     If valid → extracts the user ID → attaches it to req.userId.

     If invalid or missing → blocks the request. */}    

    try{

        let {token} = req.cookies

        if(!token){

            return res.status(400).json({message:"User does not has token"})
        }

      // Token from cookie   

        let verifyToken= await jwt.verify(token,process.env.JWT_SECRET)



        if(!verifyToken)
        {
         return res.status(400).json({message:"User does not have a valid token"})           
        }

    {/*Since, we were passing userId and role in token. Attach both to request */}

    req.userId = verifyToken.userId
    req.role = verifyToken.role

    next()

    }catch(error){

     return res.status(500).json({message:` isAuth error ${error}. `})

    }

}

export default isAuth