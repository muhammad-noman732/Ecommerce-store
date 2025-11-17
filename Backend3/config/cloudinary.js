import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadOnClodinary=async(filepath)=>{

   // Validate Cloudinary env vars
    if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        throw new Error('Cloudinary configuration is missing. Check CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.')
    }

   // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });    

    try{

        if(!filepath)
            return null

        const uploadResult = await cloudinary.uploader.upload(filepath)
 
        // deletes only if filepath exists
        if(fs.existsSync(filepath)){
            fs.unlinkSync(filepath)
        }

        return uploadResult.secure_url

    }catch(error){
       // Cloudinary error - return null instead of undefined
       // Clean up file even if upload failed
       if(fs.existsSync(filepath)){
           fs.unlinkSync(filepath)
       }
       // Re-throw if it's a configuration error (should fail fast)
       if (error.message?.includes('Cloudinary configuration')) {
           throw error
       }
       return null
    }
}

export default uploadOnClodinary