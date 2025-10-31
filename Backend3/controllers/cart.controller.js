import express from "express";
import { User } from "../model/user.model.js"
export const  addToCart=async(req,res)=>{

    try{

       let {itemId,size} = req.body;
       
       const userData = await User.findById(req.userId);

       //Check if user exists

      if(!userData){
      return res.status(400).json({message:"User is not found."})        
      }
      

      //Ensure cartData is initialized
/*
you're ensuring that cartData is defined as an object—even if the user does already have a cart saved in their database record. Here's why it's important:

Guard Against Undefined:
If userData.cartData is undefined (for example, when a user has never added an item to their cart), using the logical OR (||) operator gives cartData an empty object ({}) so that you can safely add properties to it without getting an error. */
      let cartData=userData.cartData || {};



   // Is this product already in the cart?
       if(cartData[itemId])
    {
       
        
    //If fist condition is true like if the product already present, then we check if the selected size is already added.    
      if(cartData[itemId][size]){

       
        //If this size already exists, increase its quantity by 1.
        cartData[itemId][size] += 1;
        
        }else{

      //👉 If size does not exist, add it with quantity 1.      
        cartData[itemId][size] = 1;
        }
    }
      
   
    //if product is not already present in cartData. means if new product is added
    else
    {
      //👉 If the product is not in the cart at all yet, create a new object for that product and set the selected size to 1.
        cartData[itemId]={};
        cartData[itemId][size] = 1;

     }

    
     await User.findByIdAndUpdate(req.userId , {cartData})

     return res.status(200).json({message:"Added to cart."})     

    }catch(error){

        console.log(error)
         return res.status(500).json({message:`Add to Cart error  ${error}`}) 
    }

}

export const UpdateCart=async(req,res)=>{
    try{

   const { itemId, size } = req.body;

//this convert the quantity into string   
   const quantity = Number(req.body.quantity);
     const userData=await User.findById(req.userId)

    let cartData = userData.cartData || {}; // ✅ Ensure cartData exists

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
 
     
     cartData[itemId][size]=quantity

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (quantity === 0) {
      delete cartData[itemId][size];

      // ✅ If no sizes left, remove the itemId completely
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }


     await User.findByIdAndUpdate(req.userId,{cartData})

   
   return res.status(201).json({message:"Cart Updated"})  


    }catch(error){
        console.log(error)
         return res.status(500).json({message:`Cart Update error  ${error}`})
    }
}



export const getUserCart= async(req,res)=>{
    try{

      const userData=await User.findById(req.userId)

    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }
      
      let cartData=await userData.cartData || {};


      console.log("Fetched cart data for user:", cartData);


      return res.status(200).json(cartData)
    }catch(error){
        console.log(error)
         return res.status(500).json({message:`Get User Cart data error  ${error}`})
    }
}