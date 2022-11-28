import express from 'express'
import product from '../controllers/productController.js'
import authorization from '../services/Authorization.js'

const productRouter =  express.Router()

productRouter.post("/create-product",[authorization.authorized],product.create)

export default  productRouter