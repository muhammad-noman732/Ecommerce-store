import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadOnClodinary=async(filepath)=>{


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
       // Cloudinary error
    }
// Prevent unlink error if file doesn't exis
    if(fs.existsSync(filepath)){
        fs.unlinkSync(filepath)
    }

}

export default uploadOnClodinary