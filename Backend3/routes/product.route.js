import express from "express"
import { addProduct, listProduct, removeProduct, updateProduct } from "../controllers/product.controller.js"
import  {upload}  from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js"
const productRouter=express.Router()

productRouter.post("/addproduct",adminAuth,upload.fields([

    {name:"image1" , maxCount:1},
    {name:"image2" , maxCount:1},
    {name:"image3" , maxCount:1},
    {name:"image4" , maxCount:1}

]),addProduct)

productRouter.get("/list",listProduct)

productRouter.delete("/remove/:id",adminAuth,removeProduct)

productRouter.put("/update/:id",adminAuth,upload.fields([

    {name:"image1" , maxCount:1},
    {name:"image2" , maxCount:1},
    {name:"image3" , maxCount:1},
    {name:"image4" , maxCount:1}

]),updateProduct)


export default productRouter