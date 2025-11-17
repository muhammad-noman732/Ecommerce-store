import mongoose from "mongoose"

const connectDb= async()=>{
    try{

        await mongoose.connect(process.env.MONGODB_URL)

        // Database connected

    }catch(error)
    {
        // DB connection error

    }
}

export default connectDb