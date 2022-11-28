import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { clearMessage, setSuccess } from "../../Store/reducers/globalReducer";
import { useGetQuery } from "../../Store/services/categoryService";
import Wrapper from "./Wrapper";

const Categories = () => {
  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  let { page } = useParams();
  if(!page){
    page = 1
  }
  const { data = [] , isFetching} = useGetQuery(page);
  useEffect(() => {
    dispatch(setSuccess(success));
  }, []);
  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, []);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark" to={"/dashboard/create-category"}>
          Add category<i className="bi bi-plus"></i>
        </Link>
      </ScreenHeader>
      {success && <div className="alert-success">{success}</div>}
      {!isFetching ? (
        data?.categories?.length > 0 && <> <div className="">
          <table className="w-full bg-gray-900 rounded-md">
            <thead>
              <tr className="border-b border-gray-800 text-left ">
                <th className="p-3 uppercase text-sm font-medium text-gray-500">name</th>
                <th className="p-3 uppercase text-sm font-medium text-gray-500">edit</th>
                <th className="p-3 uppercase text-sm font-medium text-gray-500">delete</th>
              </tr>
            </thead>
            <tbody>
              {
                data?.categories.map((category)=>(
                  <tr className="odd:bg-gray-800" key={category._id}>
                    <td className="p-3 capitalize text-sm font-normal text-gray-400">{category.name}</td>
                    <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link className="btn btn-warning" to={`/dashboard/update-category/${category._id}`}>edit</Link></td>
                    <td className="p-3 capitalize text-sm font-normal text-gray-400"><button>delete</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <Pagination path="dashboard/categories" page={parseInt(page)} perPage={data.perPage} count={data.count}/>
        </>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Categories;
