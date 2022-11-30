import React from 'react'
import { Link } from 'react-router-dom'
import currency from "currency-formatter";
import {motion} from 'framer-motion'

const ProductCard = ({product}) => {
    const percentage = product.discount / 100;
    const discountPrice =
      product.price - product.price * percentage;
  return (
    <motion.div  initial={{opacity:0}}
    animate ={{opacity:1}} key={product._id} className="w-full sm:w-6/12  md:w-4/12 xl:w-3/12 px-5 py-2">
    <Link to={`/product/${product._id}`}>
      <div className="w-full">
        <img
          src={`/images/${product.image1}`}
          alt="productimage"
          className="rounded-lg  w-full h-[300px] object-cover"
        />
      </div>
      <p className="capitalize text-base font-medium text-black my-2">
        {product.title}
      </p>
      <div className="flex justify-between">
        <span className="text-lg font-medium text-gray-600 ">
          {currency.format(discountPrice, { code: "USD" })}
        </span>
        <span className="text-lg font-medium text-gray-600 line-through">
          {currency.format(product.price, { code: "USD" })}
        </span>
      </div>
    </Link>
  </motion.div>
  )
}

export default ProductCard