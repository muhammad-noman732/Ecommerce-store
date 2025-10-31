import { User } from "../model/user.model.js"


export const getCurrentUser=async(req,res)=>{
    try{

   {/*This userId is coming from is Auth because of next() */}
     let user=await User.findById(req.userId)
        //since we don't want password
        .select("-password")

     if(!user){
        return res.status(404).json({message:"User is not found."})
     }   

        return res.status(200).json(user)


    }catch(error){

         return res.status(500).json({message:`Get User error  ${error}`})       
        

    }
}

export const getAdmin = async(req,res)=>{
    try{

      if(req.role !== 'ADMIN'){
        return res.status(403).json({message:"Forbidden. Admins only."})
      }

      const admin = await User.findById(req.userId).select('email role')
      if(!admin){
        return res.status(404).json({message:"User is not found."})
      }

      return res.status(201).json({
        email: admin.email,
        role: admin.role
      })


    }catch(error){
         return res.status(500).json({message:`Get  Admin   error  ${error}`}) 
    }
}