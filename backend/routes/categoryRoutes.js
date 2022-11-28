import express from 'express'
import { categoryValidations } from '../validations/categoryValidations.js'
import categoryContoller from '../controllers/categoryController.js'
import authorization from '../services/Authorization.js'
const categoryRouter = express.Router()

categoryRouter.post("/create-category",[categoryValidations,authorization.authorized],categoryContoller.create)
categoryRouter.get("/categories/:page",authorization.authorized,categoryContoller.categories)
categoryRouter.get("/fetch-category/:id",authorization.authorized,categoryContoller.fetchCategory)

export default categoryRouter