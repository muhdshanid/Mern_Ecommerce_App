import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "./Wrapper";
import toast, { Toaster } from "react-hot-toast";
import { clearMessage } from "../../Store/reducers/globalReducer";
import { useDeleteProductMutation, useGetProductsQuery } from "../../Store/services/productService";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

const Products = () => {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.globalReducer);
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { data = [], isFetching } = useGetProductsQuery(page);
  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    return () => {
      dispatch(clearMessage());
    };
  }, []);
  const [deletePro,res] = useDeleteProductMutation()
  const deleteProduct = id => {
    if(window.confirm("Are you really want to delete this product")){
      deletePro(id)
    }
  }
  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark" to={"/dashboard/create-product"}>
          create product<i className="bi bi-plus"></i>
        </Link>
        <Toaster position="top-right" />
      </ScreenHeader>
      {!isFetching ? (
        data?.products?.length > 0 ? (
          <div>
            <table className="w-full bg-gray-900 rounded-md">
              <thead>
                <tr className="border-b border-gray-800 text-left ">
                  <th className="p-3 uppercase text-sm font-medium text-gray-500">
                    name
                  </th>
                  <th className="p-3 uppercase text-sm font-medium text-gray-500">
                    price
                  </th>
                  <th className="p-3 uppercase text-sm font-medium text-gray-500">
                    stock
                  </th>
                  <th className="p-3 uppercase text-sm font-medium text-gray-500">
                    image
                  </th>
                  <th className="p-3 uppercase text-sm font-medium text-gray-500">
                    edit
                  </th>
                  <th className="p-3 uppercase text-sm font-medium text-gray-500">
                    delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.map((product) => (
                  <tr className="odd:bg-gray-800" key={product._id}>
                    <td className="p-3 capitalize text-sm font-normal text-gray-400">
                      {product.title}
                    </td>
                    <td className="p-3 capitalize text-sm font-normal text-gray-400">
                      ${product.price}.00
                    </td>
                    <td className="p-3 capitalize text-sm font-normal text-gray-400">
                      {product.stock}
                    </td>
                    <td>
                      <img
                        src={`/images/${product.image1}`}
                        alt="image1"
                        className="w-20 h-20 rounded-md object-cover"
                      />
                    </td>
                    <td className="p-3 capitalize text-sm font-normal text-gray-400">
                      <Link className="btn btn-warning" to={`/dashboard/edit-product/${product._id}`}>
                        edit
                      </Link>
                    </td>
                    <td className="p-3 capitalize text-sm font-normal text-gray-400">
                      <button onClick={()=>deleteProduct(product._id)} className="btn btn-danger cursor-pointer" to={``}>
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              path="dashboard/products"
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
            />
          </div>
        ) : (
          "No Products"
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Products;
