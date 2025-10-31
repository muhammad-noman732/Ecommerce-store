import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { allOrders, placeOrder, updateStatus, userOrders } from '../controllers/order.controller.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()

//for User
orderRouter.post('/placeorder',isAuth,placeOrder)

orderRouter.post('/userorder',isAuth,userOrders)

//for Admin
orderRouter.post('/list',adminAuth,allOrders)

orderRouter.post('/status',adminAuth,updateStatus)

export default orderRouter