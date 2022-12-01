import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/home/Header";
import Nav from "../../components/home/Nav";
import { useCatProductsQuery } from "../../Store/services/homeProductsServices";
import ProductCard from "../../components/home/ProductCard";
import Pagination from "../../components/Pagination";
import ProductSkeleton from "../../components/home/ProductSkeleton";
const CatProduct = () => {
  const { name, page = 1 } = useParams();
  const { data, isFetching } = useCatProductsQuery({
    name,
    page: parseInt(page),
  });

  return (
    <>
      <Nav />
      <div className="mt-[130px] ">
        <Header>#{name}</Header>
      </div>
      <div className="my-container my-10">
        {isFetching ? (
          <ProductSkeleton/>
        ) : data.count > 0 ? (
          <>
          <p className="mb-3 text-base font-medium text-gray-700">{data.count} products found in #{name} category</p>
            <div className="flex flex-wrap -mx-5">
              {data.products.map((product) => {
              
                return (
                  <ProductCard key={product._id} product={product}/>
                );
              })}
            </div>
            <Pagination
            theme="light"
              path={`cat-products/${name}`}
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
            />
          </>
        ) : (
          <p className="alert-danger">No Products found in #{name} category</p>
        )}
      </div>
    </>
  );
};

export default CatProduct;
