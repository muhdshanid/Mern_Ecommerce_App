import express from 'express'
const orderRouter = express.Router()
import orderController from '../controllers/orderController.js'
import authorization from '../services/Authorization.js'

orderRouter.get("/orders",authorization.authorized,orderController.getOrder)
orderRouter.get("/order-details/:id",authorization.authorized,orderController.orderDetails)
orderRouter.put("/order-update",authorization.authorized,orderController.updateOrder)

export default orderRouter 