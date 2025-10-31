import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { getAdmin, getCurrentUser, getAllUsers } from '../controllers/user.controller.js'
import  adminAuth  from '../middleware/adminAuth.js'


const userRouter=express.Router()

userRouter.get('/getcurrentuser',isAuth,getCurrentUser)

userRouter.get('/getadmin',adminAuth,getAdmin)

userRouter.get('/list',adminAuth,getAllUsers)

export default userRouter