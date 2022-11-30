import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { validationResult } from "express-validator";
import path from "path";
import ProductModel from "../models/Product.js";
class Product {
  async create(req, res) {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (!err) {
        const parsedData = JSON.parse(fields.data);
        const errors = [];
        if (parsedData.title.trim().length === 0) {
          errors.push({ msg: "Title is required" });
        }
        if (parseInt(parsedData.price) < 1) {
          errors.push({ msg: "Price should be above $1 required" });
        }
        if (parseInt(parsedData.discount) < 0) {
          errors.push({ msg: "Discount should not be negative" });
        }
        if (parseInt(parsedData.stock) < 20) {
          errors.push({ msg: "Stock should  be above 20 " });
        }
        if (parsedData.category.trim().length === 0) {
          errors.push({ msg: "Category is required" });
        }
        if (fields.description.trim().length === 0) {
          errors.push({ msg: "description is required" });
        }
        if (errors.length === 0) {
          if (!files["image1"]) {
            errors.push({ msg: "Image1 is required" });
          }
          if (!files["image2"]) {
            errors.push({ msg: "Image2 is required" });
          }
          if (!files["image3"]) {
            errors.push({ msg: "Image3 is required" });
          }
          if (errors.length === 0) {
            const images = {};
            for (let i = 0; i < Object.keys(files).length; i++) {
              const mimeType = files[`image${i + 1}`].mimetype;
              const extension = mimeType.split("/")[1].toLowerCase();
              if (
                extension === "jpeg" ||
                extension === "jpg" ||
                extension === "png"
              ) {
                const imageName = uuidv4() + `.${extension}`;
                const __dirname = path.resolve();
                const newPath =
                  __dirname + `/../frontend/public/images/${imageName}`;
                images[`image${i + 1}`] = imageName;
                fs.copyFile(files[`image${i + 1}`].filepath, newPath, (err) => {
                  if (err) {
                    console.log(err);
                  }
                });
              } else {
                const error = {};
                error[`msg`] = `image${i + 1} has invalid ${extension} type`;
                errors.push(error);
              }
            }
            if (errors.length === 0) {
              try {
                const product = await ProductModel.create({
                  title: parsedData.title,
                  price: parseInt(parsedData.price),
                  discount: parseInt(parsedData.discount),
                  stock: parseInt(parsedData.stock),
                  category: parsedData.category,
                  colors: parsedData.colors,
                  sizes: JSON.parse(fields.sizes),
                  image1: images["image1"],
                  image2: images["image2"],
                  image3: images["image3"],
                  description: fields.description,
                });
                return res
                  .status(201)
                  .json({ msg: "Product has created ", product });
              } catch (error) {
                console.log(error);
                return res.status(500).json(error);
              }
            } else {
              return res.status(400).json({ errors });
            }
          } else {
            return res.status(400).json({ errors });
          }
        } else {
          return res.status(400).json({ errors });
        }
      }
    });
  }
  async getProducts(req, res) {
    const { page } = req.params;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    try {
      const count = await ProductModel.find({}).countDocuments();
      const response = await ProductModel.find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });
      return res.status(200).json({ products: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }
  async getProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductModel.findOne({ _id: id })
      //.select([
       // "-image1", 
       // "-image2",
       // "-image3",
      //]);
      return res.status(200).json(product);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
  async updateProduct(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const {
          _id,
          title,
          price,
          discount,
          stock,
          colors,
          sizes,
          description,
          category,
        } = req.body;
        const response = await ProductModel.updateOne(
          { _id },
          {
            $set: {
              title,
              price,
              discount,
              stock,
              colors,
              sizes,
              description,
              category,
            },
          }
        );
        return res.status(200).json({ msg: "Product has updated", response });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
  async deleteProduct(req,res){
    const {id} = req.params
    try {
      const product = await ProductModel.findOne({_id:id});
      [1,2,3].forEach((number)=>{
        let key = `image${number}`
        let image = product[key]
        let __dirname = path.resolve();
        let imagePath =
          __dirname + `/../frontend/public/images/${image}`;
          fs.unlink(imagePath,(err)=>{
            if(err){
              throw new Error(err)
            }else{
              
            }
          })
      })
      await ProductModel.findByIdAndDelete(id) 
      return res.status(200).json({msg:"Product has been deleted successfully"})
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

const product = new Product();

export default product;
