import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { getAdmin, getCurrentUser, getAllUsers, updateUser, deleteUser } from '../controllers/user.controller.js'
import adminAuth from '../middleware/adminAuth.js'


const userRouter = express.Router()

userRouter.get('/getcurrentuser', isAuth, getCurrentUser)

userRouter.get('/getadmin', adminAuth, getAdmin)

userRouter.get('/list', adminAuth, getAllUsers)

userRouter.put('/update/:id', adminAuth, updateUser)
userRouter.delete('/delete/:id', adminAuth, deleteUser)

export default userRouter