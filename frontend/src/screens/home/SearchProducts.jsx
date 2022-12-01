import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/home/Header";
import Nav from "../../components/home/Nav";
import { useSearchProductsQuery } from "../../Store/services/homeProductsServices";
import ProductCard from "../../components/home/ProductCard";
import Pagination from "../../components/Pagination";
import ProductSkeleton from "../../components/home/ProductSkeleton";
const SearchProducts = () => {
  const { keyword, page = 1 } = useParams();
  const { data, isFetching } = useSearchProductsQuery({
    keyword,
    page: parseInt(page),
  });

  return (
    <>
      <Nav />
      <div className="mt-[130px] ">
        <Header>#{keyword}</Header>
      </div>
      <div className="my-container my-10">
        {isFetching ? (
          <ProductSkeleton/>
        ) : data.count > 0 ? (
          <>
          <p className="mb-3 text-base font-medium text-gray-700">{data.count} products found for #{keyword} keyword </p>
            <div className="flex flex-wrap -mx-5">
              {data.products.map((product) => {
              
                return (
                  <ProductCard key={product._id} product={product}/>
                );
              })}
            </div>
            <Pagination
            theme="light"
              path={`cat-products/${keyword}`}
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
            />
          </>
        ) : (
          <p className="alert-danger">No Products found for #{keyword} keyword</p>
        )}
      </div>
    </>
  );
};

export default SearchProducts;
