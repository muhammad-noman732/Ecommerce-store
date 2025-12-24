import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { allOrders, placeOrder, updateStatus, userOrders, getStats, updatePaymentStatus } from '../controllers/order.controller.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()

//for User
orderRouter.post('/placeorder', isAuth, placeOrder)

orderRouter.post('/userorder', isAuth, userOrders)

// Update payment status after Stripe checkout
orderRouter.post('/update-payment', isAuth, updatePaymentStatus)

//for Admin
orderRouter.post('/list', adminAuth, allOrders)

orderRouter.post('/status', adminAuth, updateStatus)

orderRouter.get('/stats', adminAuth, getStats)

export default orderRouter