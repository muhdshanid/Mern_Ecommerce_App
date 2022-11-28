import express from 'express'
import dotenv from 'dotenv'
import { connect } from './config/db.js'
import userRouter from './routes/userRoutes.js'
import cors from 'cors'
import categoryRouter from './routes/categoryRoutes.js'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

connect()

app.use(express.json())
app.use(cors())
app.use("/api",userRouter)
app.use("/api",categoryRouter)

app.get("/",(req,res)=>{
    res.json({msg:"Welcome to chawkbazar once again"})
})

app.listen(PORT,()=>{
    console.log(`Server listening to the port ${PORT}`);
})