import express from 'express'
import homeProducts from '../controllers/homeProductController.js'
import product from '../controllers/productController.js'
import authorization from '../services/Authorization.js'
import { productValidation } from '../validations/productValidation.js'

const productRouter =  express.Router()

productRouter.post("/create-product",[authorization.authorized],product.create)
productRouter.get("/products/:page",authorization.authorized,product.getProducts)
productRouter.get("/product/:id",product.getProduct)
productRouter.put("/product",[authorization.authorized,productValidation],product.updateProduct)
productRouter.delete("/delete-product/:id",authorization.authorized,product.deleteProduct)
productRouter.get("/cat-products/:name/:page?",homeProducts.catProducts)
productRouter.get("/search-products/:keyword/:page?",homeProducts.catProducts)
export default  productRouter 