import express from "express";
import paymentController from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session",paymentController.paymentProcess);

export default paymentRouter;
