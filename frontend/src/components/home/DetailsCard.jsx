import React, { useState } from "react";
import currency from "currency-formatter";
import h2p from "html2plaintext";
import DetailsImages from "./DetailsImages";
import Quantity from "./Quantity";
import htmlParser from "html-react-parser";
import { motion } from "framer-motion";
import { BsCheck2 } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Store/reducers/cartReducer";
import { discount } from "../../utils/discount";
const DetailsCard = ({ product }) => {
  const [sizeState, setSizeState] = useState(
    product?.sizes?.length > 0 && product.sizes[0].name
  );
  const [colorState, setColorState] = useState(
    product?.colors?.length > 0 && product.colors[0].color
  );
  const dispatch = useDispatch()
  const addToCartFn = () => {
    const {
      ["colors"]: colors,
      ["sizes"]: sizes,
      ["createdAt"]: createdAt,
      ["updatedAt"]: updatedAt,
      ...newProduct
    } = product;

    newProduct['size'] = sizeState
    newProduct['color'] = colorState
    newProduct['quantity'] = quantity
    const cart =  localStorage.getItem("cart")
    const cartItems = cart ? JSON.parse(cart) : []
    const checkItem = cartItems.find(item => item._id === newProduct._id)
    if(!checkItem){
      dispatch(addToCart(newProduct))
      cartItems.push(newProduct)
      localStorage.setItem("cart",JSON.stringify(cartItems))
    }else{
      toast.error(`${newProduct.title} is already in cart`)
      return 
    }
     
  };
  
  const discountPrice = discount(product.price,product.discount)
  let des = h2p(product.description);
  des = htmlParser(des);
  const [quantity, setQuantity] = useState(1);
  const inc = () => {
    setQuantity(quantity + 1);
  };
  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap -mx-5"
    >
      <Toaster />
      <div className="w-full  order-2  mx-0 md:order-1 md:w-6/12 p-5">
        <div className="flex flex-wrap -mx-1">
          <DetailsImages image={product.image1} />
          <DetailsImages image={product.image2} />
          <DetailsImages image={product.image3} />
        </div>
      </div>
      <div className="w-full order-1 md:order-2 md:w-6/12 p-5">
        <h1 className="text-2xl font-bold to-gray-900 capitalize">
          {product.title}
        </h1>
        <div className="flex justify-between my-5">
          <span className="text-2xl font-bold to-gray-900">
            {" "}
            {currency.format(discountPrice, { code: "USD" })}
          </span>
          <span className="text-2xl  to-gray-500 line-through">
            {currency.format(product.price, { code: "USD" })}
          </span>
        </div>

        {product.sizes.length > 0 && (
          <>
            <h3 className="text-base font-medium capitalize text-gray-600 mb-2">
              sizes
            </h3>
            <div className="flex flex-wrap -mx-1">
              {product.sizes.map((size) => (
                <div
                  key={size.name}
                  onClick={() => setSizeState(size.name)}
                  className={`p-1.5 m-1 border rounded cursor-pointer border-gray-300 
                  ${sizeState === size.name && "bg-indigo-600 "}`}
                >
                  <span
                    className={`text-sm uppercase  ${
                      sizeState === size.name ? "text-white " : "text-gray-900"
                    }`}
                  >
                    {size.name}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
        {product.colors.length > 0 && (
          <>
            <h3 className="text-base font-medium capitalize text-gray-600 mb-2 mt-3">
              colors
            </h3>
            <div className="flex flex-wrap -mx-1 ">
              {product.colors.map((clr) => (
                <div
                  onClick={() => setColorState(clr.color)}
                  key={clr.color}
                  className="border border-gray-300 rounded m-1 p-0.5 cursor-pointer"
                >
                  <span
                    className="min-w-[40px] min-h-[40px] rounded flex items-center justify-center"
                    style={{ backgroundColor: clr.color }}
                  >
                    {colorState === clr.color && (
                      <BsCheck2 size={20} className="text-white" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex -mx-3 items-center">
          <div className="w-full sm:w-6/12 p-3">
            <Quantity quantity={quantity} inc={inc} dec={dec} />
          </div>
          <div className="w-full sm:w-6/12 p-3">
            <button onClick={addToCartFn} className="btn btn-indigo">
              Add To Cart
            </button>
          </div>
        </div>
        <h3 className="text-base font-medium capitalize text-gray-600 mb-2 mt-3">
          description
        </h3>
        <div className="mt-4 leading-[27px] description">{des}</div>
      </div>
    </motion.div>
  );
};

export default DetailsCard;
