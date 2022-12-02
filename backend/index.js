import express from 'express'
import dotenv from 'dotenv'
import { connect } from './config/db.js'
import userRouter from './routes/userRoutes.js'
import cors from 'cors'
import categoryRouter from './routes/categoryRoutes.js'
import productRouter from './routes/productRoutes.js'
import paymentRouter from './routes/paymentRoutes.js'
import orderRouter from './routes/orderRoutes.js'
dotenv.config()


const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
connect()
app.post(
    "/api/webhook",
    express.json({
      verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    },
})
);
app.use(express.json())
app.use("/api",userRouter)
app.use("/api",categoryRouter)
app.use("/api",productRouter)
app.use("/api",paymentRouter)
app.use("/api",orderRouter)

app.get("/",(req,res)=>{
    res.json({msg:"Welcome to chawkbazar once again"})
})

app.listen(PORT,()=>{
    console.log(`Server listening to the port ${PORT}`);
})