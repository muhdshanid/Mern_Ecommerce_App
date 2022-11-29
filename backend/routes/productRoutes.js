import express from 'express'
import product from '../controllers/productController.js'
import authorization from '../services/Authorization.js'
import { productValidation } from '../validations/productValidation.js'

const productRouter =  express.Router()

productRouter.post("/create-product",[authorization.authorized],product.create)
productRouter.get("/products/:page",authorization.authorized,product.getProducts)
productRouter.get("/product/:id",authorization.authorized,product.getProduct)
productRouter.put("/product",[authorization.authorized,productValidation],product.updateProduct)
productRouter.delete("/delete-product/:id",authorization.authorized,product.deleteProduct)
export default  productRouter