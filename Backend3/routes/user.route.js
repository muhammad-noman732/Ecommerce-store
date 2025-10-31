import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { getAdmin, getCurrentUser } from '../controllers/user.controller.js'
import  adminAuth  from '../middleware/adminAuth.js'


const userRouter=express.Router()

userRouter.get('/getcurrentuser',isAuth,getCurrentUser)

userRouter.get('/getadmin',adminAuth,getAdmin)

export default userRouter