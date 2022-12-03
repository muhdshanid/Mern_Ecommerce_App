import express from "express";
import paymentController from "../controllers/paymentController.js";
import authorization from "../services/Authorization.js";
const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session",authorization.authorized,paymentController.paymentProcess);

paymentRouter.post('/webhook',express.raw({type: 'application/json'}), paymentController.checkoutSession);
paymentRouter.get("/verify-payment/:id",authorization.authorized,paymentController.paymentVerify)

export default paymentRouter;  
 