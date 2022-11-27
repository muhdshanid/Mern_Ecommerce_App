import express from 'express'
import dotenv from 'dotenv'
import { connect } from './config/db.js'
import userRouter from './routes/users/userRoutes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

connect()

app.use(express.json())
app.use(userRouter)

app.get("/",(req,res)=>{
    res.json({msg:"Welcome to chawkbazar once again"})
})

app.listen(PORT,()=>{
    console.log(`Server listening to the port ${PORT}`);
})