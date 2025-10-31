import React, { createContext, useContext, useEffect, useState } from 'react'
import UserContext, { userDataContext } from './UserContext'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const shopDataContext=createContext()

function ShopContext({children}) {

    let [products,setProducts]=useState([])

    let [search,setSearch]=useState("")
    let [showSearch,setShowSearch]=useState(false)

    let [loading,setLoading]=useState(false)

    let [cartItem, setCartItem]=useState({})

    let {userData}=useContext(userDataContext)

    let {serverUrl}=useContext(authDataContext)

    let currency='$';

    let delivery_fee=10;

    const getProducts=async(page=1, limit=200)=>{

        try{

            let result=await axios.get(serverUrl+"/api/product/list",{
                params: { page, limit },
                withCredentials:true
            })

            // Backend returns { data, page, limit, total, totalPages }
            // Extract the data array from the response
            const productsData = result.data?.data || result.data || []
            setProducts(productsData)

            console.log("Get All products", productsData)

        }catch(error){
          console.log("Get Products  error ❌", error.response?.data || error.message)
        }

    }


const addToCart = async (itemId, size) => {
  // For vehicles (which don't have sizes), use a default size
  // This keeps the existing cart structure compatible
  const cartSize = size || "default"

  /*cartItem is the current state of the cart from useState.

🔧 Why structuredClone()?
Creates a deep clone (independent copy) of the entire cartItem object.

This is important because:

Direct mutation of state (like modifying cartItem directly) is not allowed in React.

It would not trigger a re-render.

cartData is now a clone that we can safely modify.


CODE:
structuredClone({}) // returns {}

So even if cartItem is initially {}, cloning it is fine.
*/

  let cartData = structuredClone(cartItem); // clone the cart


  
  
  //Check if this product (itemId) is already in the cart. If not, create an empty object for it.
  if (!cartData[itemId]) {
    cartData[itemId] = {};  // ✅ Ensure the itemId object exists and Ensures you can store sizes for this product ID.So we can say that cartData is an object . And cartData[itemId] is creating the object for itemid in the caartData object
  }


  /*This 'if' condition checks if the size already exists under that product.
  Like when user clicks on any item. If user selects the "L" size. it is added as :

    itemId1: {
    L: 1
  }

  but when user clicks on the same size, it checks whether the user selects the same size. then, it is incremented by 1:  

      itemId1: {
       L: 2
      }

      So, collectively, this condition checks if the user selects the same size. Then it will continue to be incremented by 1. 
  */



/*====Deep Understanding of the whole concept===================== 
🤔 Why does it

  cartData = {
    itemId2: {
      L: 1
        }
   }

look like a nested object?

Here you are creating nested objects. Like we introduced cartItem as an object . And we cloned it deeply in a variable named 'cartData'. So cartData is also an object. Now In cartData we check 
      if (!cartData[itemId])

 if the product of that Id exists. If not then do this 
       cartData[itemId] = {};

Here we are creating the object for that product Id in cartData object. So it appears as nested objects. 
Now we check:
      
      if (cartData[itemId][size]) {
         cartData[itemId][size] += 1;
         }
if the size of that productId already exists in that productId object.Then in the same condition,we check if that size key is already present in productId object. if it is then increment it by 1.

if that size key is not present in the productId object:
     else {
        cartData[itemId][size] = 1;
     }
 Then we add it with quantity 1.   

       

✅ Final Answer:
You’re manually building this structure using basic JavaScript object assignments:

cartData[itemId][size] = 1;

Which results in:

cartData = {
  itemId2: {
    L: 1
  }
}
      */

  if (cartData[itemId][cartSize]) {
    cartData[itemId][cartSize] += 1;
  }



  /* This "else" condition check 	If size doesn't exist, add it with quantity 1. 
  For Example: if the user selects different size then  the size becomes 1. For Example:

  cartItem = {
  itemId1: {
    S: 1,
    M: 2
  }*/
  else {
    cartData[itemId][cartSize] = 1;
  }


 
  /*
  What happens to cartData variable 
 after this setCartItem(cartData)?

 This does two things:

Updates the cartItem state (inside ShopContext)

Triggers React re-render of all components using cartItem

💥 What Happens to cartData After This?
It’s just a local variable inside the function, so:

After the function ends, cartData disappears (garbage collected).

You don’t need to delete it yourself.

Think of it like a scratchpad: use → update → discard.
 */ 

  setCartItem(cartData);

  console.log(cartData)

  if(userData){

    try{

       let result = await axios.post(serverUrl + '/api/cart/add' , {itemId, size: cartSize},{withCredentials:true})

       console.log(result.data)
       setLoading(false)

       await getUserCart()

    }catch(error){
          console.log("Add to cart error ❌", error.response?.data || error.message)
          setLoading(false)
    }
     

  }



};

const getUserCart=async()=>{
    try{

      const result=await axios.post(serverUrl+'/api/cart/get',{},{withCredentials:true})  

      setCartItem(result.data)

      console.log("User Cart",result.data)

    }catch(error){
          console.log("Get User cart error ❌", error.response?.data || error.message)
    }
};

const updateQuantity=async(itemId , size , quantity)=>{

    let cartData=structuredClone(cartItem)

    cartData[itemId][size]=quantity

    if(quantity === 0){
        delete cartData[itemId][size]
    }


    setCartItem(cartData)

    if(userData)
 {      
     try{

        let result=await axios.post(serverUrl+'/api/cart/update',{
            itemId,
            size,
            quantity
        },{withCredentials:true})

        await getUserCart()

     }catch(error){
          console.log("Update cart data error ❌", error.response?.data || error.message)
     }
 }

   }



    const getCartCount=()=>{

    /*You initialize a variable totalCount to keep track of total quantity.
This will store the sum of all size quantities of all products.*/    
    
      let totalCount=0

/*items is actually each itemId in your cart.

You are looping over each product in the cart.

Example: First loop → items = "itemId1", second → "itemId2".
*/

      
  for(const items in cartItem){

/*Now you loop through all sizes of that specific item.

Example: If cartItem["itemId1"] = { S: 2, M: 1 }, you get "S" and "M" in this loop. */    
     for(const item in cartItem[items]){
       try{

/*Your cart is nested like:
cartItem[itemId][size] = quantity */       

        if(cartItem[items][item] >0){
    
            totalCount += cartItem[items][item]
                    }
        }catch(error){

             console.log(error)
                }
            }
        }

        return totalCount;
    }

    const getCartAmount=()=>{

        let totalAmount = 0

     //In this we are looping the products objects in cartItlem object    
        for(const items in cartItem){

    //here we are finding the items from all the products.Since items id is stored in cartData, so we finding them by comparing their id's with the products         
         let itemInfo=products.find((product)=>product._id === items);

    
    //In this, we are looping over the sizes of that selected items     
     for(const item in cartItem[items]) {

        try{
            if(cartItem[items][item]>0){
                totalAmount+=itemInfo.price * cartItem[items][item];
            }

              }catch(error){

            }

          }

        }
        return totalAmount
    }    

    useEffect(()=>{
 
        getProducts()

    },[])

    useEffect(()=>{

        getUserCart()

    },[])




    let value={
      products,setProducts,delivery_fee,currency,
      showSearch,setShowSearch,
      search,setSearch,
      getProducts,
      cartItem,addToCart,getCartCount,setCartItem,updateQuantity,getCartAmount

    }

  return (
    <shopDataContext.Provider value={value}>
        {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext