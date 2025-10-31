import Order from "../model/order.model.js"
import { User } from "../model/user.model.js"
import Product from "../model/productModel.js"


//for user
export const placeOrder=async(req,res)=>{
    try{

        const {items , amount , address} = req.body

        const userId=req.userId

        const orderData={
            items,
            amount,
            userId,
            address,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }

       
        const newOrder=await Order.create(orderData)

      // After placing an order, the user's cart is emptied. Because we have userOrders controller to store all the orders placed by user  
        await User.findByIdAndUpdate(userId,{cartData:{}})

      return res.status(201).json({message:"Order Placed."})  

    }catch(error){

        console.log(error)
      return res.status(500).json({message:`Order Place error ${error}`})
    }
}

export const userOrders=async(req,res)=>{
  try{

    // it is coming from isAuth middleware
    const userId=req.userId

    const orders=await Order.find({userId})

      return res.status(201).json(orders)  


  }catch(error){
        console.log(error)
      return res.status(500).json({message:`User's Order error ${error}`})
  }
}

//for Admin

export const allOrders=async(req,res)=>{
  try{

    const orders=await Order.find({})
    return res.status(200).json(orders)

  }catch(error){

    return res.status(500).json({message:"Admin all orders error"})

  }
}

export const updateStatus=async(req,res)=>{
  try{

    const {orderId ,status}=req.body

    await Order.findByIdAndUpdate(orderId,{status})

     return res.status(200).json({message:"Status updated"}) 
  }catch(error){
   return res.status(500).json({message:error.message})
  }
}

// Get dashboard statistics (Admin only)
export const getStats = async(req,res)=>{
  try{

    if(req.role !== 'ADMIN'){
      return res.status(403).json({message:"Forbidden. Admins only."})
    }

    const [totalVehicles, totalOrders, totalUsers, orders] = await Promise.all([
      Product.countDocuments({}),
      Order.countDocuments({}),
      User.countDocuments({}),
      Order.find({}).select('amount payment')
    ])

    // Calculate total revenue (sum of all paid orders)
    const totalRevenue = orders
      .filter(order => order.payment === true)
      .reduce((sum, order) => sum + (order.amount || 0), 0)

    // Calculate pending revenue (sum of unpaid orders)
    const pendingRevenue = orders
      .filter(order => order.payment === false)
      .reduce((sum, order) => sum + (order.amount || 0), 0)

    return res.status(200).json({
      totalVehicles,
      totalOrders,
      totalUsers,
      totalRevenue,
      pendingRevenue
    })

  }catch(error){
    console.log(error)
    return res.status(500).json({message:`Get Stats error ${error}`})
  }
}
