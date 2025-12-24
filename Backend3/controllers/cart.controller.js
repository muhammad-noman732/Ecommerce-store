import express from "express";
import { User } from "../model/user.model.js"


export const  addToCart=async(req,res)=>{
    try{

       let { itemId , size} = req.body;
       
       const userData = await User.findById(req.userId);

      if(!userData){
      return res.status(400).json({message:"User is not found."})        
      }
      
      let cartData = userData.cartData || {};

       if(cartData[itemId])
    {
      if(cartData[itemId][size]){
        cartData[itemId][size] += 1;
        }else{
        cartData[itemId][size] = 1;
        }
    }
    else
    {
        cartData[itemId]={};
        cartData[itemId][size] = 1;
     }

     await User.findByIdAndUpdate(req.userId , {cartData})

     return res.status(200).json({message:"Added to cart."})     

    }catch(error){
         return res.status(500).json({message:`Add to Cart error  ${error}`}) 
    }

}

export const UpdateCart=async(req,res)=>{
    try{

   const { itemId, size } = req.body;
   const quantity = Number(req.body.quantity);
     const userData=await User.findById(req.userId)

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (quantity === 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

     await User.findByIdAndUpdate(req.userId,{cartData})

   
   return res.status(201).json({message:"Cart Updated"})  


    }catch(error){
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

      return res.status(200).json(cartData)
    }catch(error){
         return res.status(500).json({message:`Get User Cart data error  ${error}`})
    }
}