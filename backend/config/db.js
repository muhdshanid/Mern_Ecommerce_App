import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const DB_PASS = process.env.DB_PASS
const DB_USER = process.env.DB_USER
const DB_URL  = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.vvqypoi.mongodb.net/ecommerceapp?retryWrites=true&w=majority`

export const connect =async () => {
    try {
         await mongoose.connect(DB_URL)
            console.log(`Database Connected`);
    } catch (error) {
        console.log(error.message);
        process.exit
    }
}