import { validationResult } from "express-validator";
import CategoryModel from "../models/Category.js";

class Category {
  async create(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { name } = req.body;
      const exist = await CategoryModel.findOne({ name });
      if (!exist) {
        await CategoryModel.create({ name });
        return res
          .status(201)
          .json({ message: "Your category has created successfully" });
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: `${name} category is already exist` }] });
      }
    } else {
      return res.status(401).json({ errors: errors.array() });
    }
  }
  async categories(req, res) {
    const page = req.params.page;
    const perPage = 3;
    const skip = (page - 1) * perPage;
    try {
      const count = await CategoryModel.find({}).countDocuments();
      const response = await CategoryModel.find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });
      return res.status(200).json({categories:response,perPage,count});
    } catch (error) {
      console.log(error.message);
    }
  }
  async fetchCategory(req,res) {
    const {id} = req.params
    try {
      const response = await CategoryModel.findOne({_id:id})
      return res.status(200).json({category:response})
    } catch (error) {
      console.log(error.message);
    }
  }
}

const category = new Category();

export default category;
