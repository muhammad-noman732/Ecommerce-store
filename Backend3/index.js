import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from "cors"
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";

dotenv.config()

let port=process.env.PORT || 7000;

let app=express()

//we are making this because data will come in json format from body . So, we make it to parse body data
app.use(express.json())

//Since we are creating a cookie we have to parse it.for this purpose
app.use(cookieParser())

{/*cors stands for Cross-Origin Resource Sharing.
It allows your backend (e.g., localhost:7500) to accept requests from a different origin (e.g., localhost:5173, your frontend). 
*/}

app.use(cors({
  origin:
  [ "http://localhost:5173" ,
    "http://localhost:5174"], // frontend URLs
  credentials: true
}));



//Routes

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.listen(port,()=>{

    console.log(`Server started at localhost://${port}`)

    connectDb()

})

