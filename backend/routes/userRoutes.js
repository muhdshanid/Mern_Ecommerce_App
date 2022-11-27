import express from 'express'
import { loginUser, registerUser } from '../controllers/usersController.js'
import {loginValidations, registerValidations} from '../validations/userValidations.js'
const userRouter = express.Router()

userRouter.post("/register",registerValidations,registerUser)
userRouter.post("/login",loginValidations,loginUser)

export default userRouter