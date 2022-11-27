import express from 'express'
import { registerUser } from '../../controllers/users/usersController.js'
import {registerValidations} from '../../validations/userValidations.js'
const userRouter = express.Router()

userRouter.post("/register",registerValidations,registerUser)

export default userRouter