import React, { useState } from "react";
import currency from "currency-formatter";
import h2p from 'html2plaintext'
import DetailsImages from "./DetailsImages";
import Quantity from "./Quantity";
import htmlParser from 'html-react-parser'

const DetailsCard = ({ product }) => {
    const percentage = product.discount / 100;
    const discountPrice =
      product.price - product.price * percentage;
      let des = h2p(product.description)
      des = htmlParser(des)
      const [quantity, setQuantity] = useState(1)
    const inc = () => {
        setQuantity(quantity+1)
    }
    const dec = () => {
        if(quantity > 1){
            setQuantity(quantity-1)
        }
    }
  return (
    <div className="flex flex-wrap -mx-5">
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
          <span className="text-2xl font-bold to-gray-900"> {currency.format(discountPrice, { code: "USD" })}</span>
          <span className="text-2xl  to-gray-500 line-through">{currency.format(product.price, { code: "USD" })}</span>
        </div>
        
            {product.sizes.length > 0 && <>
            <h3 className="text-base font-medium capitalize text-gray-600 mb-2">sizes</h3>
            <div className="flex flex-wrap -mx-1">
                {
                    product.sizes.map((size)=>(
                        <div key={size.name} className="p-1.5 m-1 border rounded cursor-pointer border-gray-300 ">
                            <span className="text-sm uppercase text-gray-900">{size.name}</span>
                        </div>
                    ))
                }
            </div>
            </>}
            {product.colors.length > 0 && <>
                <h3 className="text-base font-medium capitalize text-gray-600 mb-2 mt-3">colors</h3>
                <div className="flex flex-wrap -mx-1 ">
                    {product.colors.map(clr=>(
                        <div key={clr.color} className='border border-gray-300 rounded m-1 p-0.5 cursor-pointer'>
                            <span className="min-w-[40px] min-h-[40px] rounded block" style={{backgroundColor:clr.color}}></span>
                        </div>
                    ))}
                </div>
            </>}
            <div className="flex -mx-3 items-center">
              <div className="w-full sm:w-6/12 p-3">
                <Quantity quantity={quantity} inc={inc} dec={dec}/>
              </div>
              <div className="w-full sm:w-6/12 p-3">
                <button className="btn btn-indigo">Add To Cart</button>
              </div>
            </div>
            <h3 className="text-base font-medium capitalize text-gray-600 mb-2 mt-3">description</h3>
            <div className="mt-4 leading-[27px] description">{des}</div>
      </div>
    </div>
  );
};

export default DetailsCard;
