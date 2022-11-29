import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import ProductModel from "../models/Product.js";
class Product {
  async create(req, res) {
    const form = formidable({ multiples: true });

    form.parse(req, async(err, fields, files) => {
      if (!err) {
        const parsedData = JSON.parse(fields.data);
        const errors = [];
        if (parsedData.title.trim().length === 0) {
          errors.push({ title: "Title is required" });
        }
        if (parseInt(parsedData.price) < 1) {
          errors.push({ price: "Price should be above $1 required" });
        }
        if (parseInt(parsedData.discount) < 0) {
          errors.push({ discount: "Discount should not be negative" });
        }
        if (parseInt(parsedData.stock) < 20) {
          errors.push({ stock: "Stock should  be above 20 " });
        }
        if (parsedData.category.trim().length === 0) {
          errors.push({ category: "Category is required" });
        }
        if (fields.description.trim().length === 0) {
          errors.push({ description: "description is required" });
        }
        if (errors.length === 0) {
          if (!files["image1"]) {
            errors.push({ image1: "Image1 is required" });
          }
          if (!files["image2"]) {
            errors.push({ image2: "Image2 is required" });
          }
          if (!files["image3"]) {
            errors.push({ image3: "Image3 is required" });
          }
          if (errors.length === 0) {
            const images = {}
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
                  images[`image${i+1}`] = imageName
                fs.copyFile(files[`image${i + 1}`].filepath, newPath, (err) => {
                  if (err) {
                    console.log(err);
                  }
                });
              } else {
                const error = {};
                error[`image${i + 1}`] = `image${
                  i + 1
                } has invalid ${extension} type`;
                errors.push(error);
              }
            }
            if (errors.length === 0) {
             try {
              const product = await ProductModel.create({
                title:parsedData.title,
                price:parseInt(parsedData.price),
                discount:parseInt(parsedData.discount),
                stock:parseInt(parsedData.stock),
                category:parsedData.category,
                colors:parsedData.colors,
                sizes:JSON.parse(fields.sizes),
                image1:images['image1'],
                image2:images['image2'],
                image3:images['image3'],
                description:fields.description
                
              })
              return res.status(201).json({msg:"Product has created ",product})
             } catch (error) {
              console.log(error);
              return res.status(500).json(error)
             }
            }else{
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
}

const product = new Product();

export default product;
