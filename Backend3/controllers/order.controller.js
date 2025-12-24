import Order from "../model/order.model.js"
import { User } from "../model/user.model.js"
import Product from "../model/productModel.js"


export const placeOrder = async (req, res) => {
  try {

    const { items, amount, address, paymentMethod, stripeSessionId } = req.body

    const userId = req.userId

    const initialPaymentStatus = paymentMethod === 'Stripe' ? false : false;

    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: paymentMethod || 'COD',
      payment: initialPaymentStatus,
      stripeSessionId: stripeSessionId || null,
      paymentStatus: paymentMethod === 'Stripe' ? 'pending' : 'cod',
      date: Date.now()
    }

    const newOrder = await Order.create(orderData)

    await User.findByIdAndUpdate(userId, { cartData: {} })

    return res.status(201).json({
      success: true,
      message: "Order Placed.",
      orderId: newOrder._id
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Order Place error ${error}`
    })
  }
}

export const userOrders = async (req, res) => {
  try {
    const userId = req.userId

    const orders = await Order.find({ userId })

    return res.status(201).json(orders)


  } catch (error) {
    return res.status(500).json({ message: `User's Order error ${error}` })
  }
}

export const allOrders = async (req, res) => {
  try {

    const orders = await Order.find({})
    return res.status(200).json(orders)

  } catch (error) {

    return res.status(500).json({ message: "Admin all orders error" })

  }
}

export const updateStatus = async (req, res) => {
  try {

    const { orderId, status } = req.body

    await Order.findByIdAndUpdate(orderId, { status })

    return res.status(200).json({ message: "Status updated" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, stripeSessionId, paymentStatus } = req.body

    const updateData = {
      payment: true,
      paymentStatus: paymentStatus || 'completed',
      paidAt: new Date()
    }

    let order;
    if (orderId) {
      order = await Order.findByIdAndUpdate(orderId, updateData, { new: true })
    } else if (stripeSessionId) {
      order = await Order.findOneAndUpdate(
        { stripeSessionId },
        updateData,
        { new: true }
      )
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Payment status updated",
      order
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Update payment status error: ${error.message}`
    })
  }
}

export const getStats = async (req, res) => {
  try {

    if (req.role !== 'ADMIN') {
      return res.status(403).json({ message: "Forbidden. Admins only." })
    }

    const [totalVehicles, totalOrders, totalUsers, orders] = await Promise.all([
      Product.countDocuments({}),
      Order.countDocuments({}),
      User.countDocuments({}),
      Order.find({}).select('amount payment')
    ])

    const totalRevenue = orders
      .filter(order => order.payment === true)
      .reduce((sum, order) => sum + (order.amount || 0), 0)

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

  } catch (error) {
    return res.status(500).json({ message: `Get Stats error ${error}` })
  }
}
