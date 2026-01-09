import Order from "../model/order.model.js"
import { User } from "../model/user.model.js"
import Product from "../model/productModel.js"
import { sendOrderConfirmationEmail, sendOrderNotificationToBusiness } from "../utils/emailService.js"


export const placeOrder = async (req, res) => {
  try {

    const { items, amount, address, paymentMethod, stripeSessionId } = req.body

    const userId = req.userId

    // Idempotency check: If Stripe payment, check if order with this sessionId already exists
    if (paymentMethod === 'Stripe' && stripeSessionId) {
      const existingOrder = await Order.findOne({ stripeSessionId });
      if (existingOrder) {
        return res.status(200).json({
          success: true,
          message: "Order already exists for this payment session.",
          orderId: existingOrder._id
        });
      }
    }

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

    // Send order confirmation emails (only for non-Stripe orders like COD)
    // For Stripe, emails are sent after payment confirmation in webhook/verify endpoint
    if (paymentMethod !== 'Stripe') {
      try {
        const user = await User.findById(userId);
        if (user) {
          // Send email to customer
          sendOrderConfirmationEmail(newOrder, user).catch(() => { });

          // Send notification to business
          sendOrderNotificationToBusiness(newOrder, user).catch(() => { });
        }
      } catch (emailError) {
        // Don't fail the order if email fails
      }
    }

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

    let order;
    if (orderId) {
      order = await Order.findById(orderId);
    } else if (stripeSessionId) {
      order = await Order.findOne({ stripeSessionId });
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      })
    }

    // Idempotency check: If already paid, return success without updating
    if (order.payment === true && order.paymentStatus === 'completed') {
      return res.status(200).json({
        success: true,
        message: "Payment status already updated",
        order
      });
    }

    const updateData = {
      payment: true,
      paymentStatus: paymentStatus || 'completed',
      paidAt: new Date()
    }

    if (orderId) {
      order = await Order.findByIdAndUpdate(orderId, updateData, { new: true })
    } else if (stripeSessionId) {
      order = await Order.findOneAndUpdate(
        { stripeSessionId },
        updateData,
        { new: true }
      )
    }

    // Send order completion emails when payment is completed (non-blocking)
    if (order.payment === true && paymentStatus === 'completed') {
      try {
        const user = await User.findById(order.userId);
        if (user) {
          // Send updated order confirmation to customer
          sendOrderConfirmationEmail(order, user).catch(() => { });

          // Send updated notification to business
          sendOrderNotificationToBusiness(order, user).catch(() => { });
        }
      } catch (emailError) {
        // Don't fail the payment update if email fails
      }
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
