import express from 'express'
import { categoryValidations } from '../validations/categoryValidations.js'
import categoryContoller from '../controllers/categoryController.js'
import authorization from '../services/Authorization.js'
const categoryRouter = express.Router()

categoryRouter.post("/create-category",[categoryValidations,authorization.authorized],categoryContoller.create)
categoryRouter.get("/categories/:page",authorization.authorized,categoryContoller.categories)
categoryRouter.get("/fetch-category/:id",authorization.authorized,categoryContoller.fetchCategory)
categoryRouter.put("/update-category/:id",[categoryValidations,authorization.authorized],categoryContoller.updateCategory)
categoryRouter.delete("/delete-category/:id",authorization.authorized,categoryContoller.deleteCategory)
categoryRouter.get("/allcategories",categoryContoller.allCategries)
categoryRouter.get("/random-categories",categoryContoller.randomCategories)
export default categoryRouter