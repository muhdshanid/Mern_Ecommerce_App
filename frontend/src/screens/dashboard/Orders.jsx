import React from "react";
import Wrapper from "./Wrapper";
import ScreeHeader from "../../components/ScreenHeader";
import { useGetOrdersQuery } from "../../Store/services/orderService";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

const Orders = () => {
  let { page } = useParams();
  page = page ? page : 1;
  const { data, isFetching } = useGetOrdersQuery(page);
  return (
    <Wrapper>
      <ScreeHeader><span className="bg-gray-900  px-3 py-2">Orders</span> </ScreeHeader>
      {!isFetching ? (
        data?.orders?.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="dashboard-table">
                <thead>
                  <tr className="dashboard-tr">
                    <th className="dashboard-th">title</th>
                    <th className="dashboard-th">quantities</th>
                    <th className="dashboard-th">image</th>
                    <th className="dashboard-th">received</th>
                    <th className="dashboard-th">Delivered</th>
                    <th className="dashboard-th">details</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orders?.map((order) => (
                    <tr key={order._id}>
                      <td className="dashboard-td">{order?.productId?.title}</td>
                      <td className="dashboard-td">{order?.quantities}</td>
                      <td className="dashboard-td">
                        <img
                          className=" w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-full"
                          src={`/images/${order?.productId?.image1}`}
                          alt="orderimage"
                        />
                      </td>
                      <td className="dashboard-td">
                        {order.received ? "Yes" : "No"}
                      </td>
                      <td className="dashboard-td">
                        {order.status ? "Yes" : "No"}
                      </td>
                      <td className="dashboard-td">
                        <Link
                          to={`/dashboard/order-details/${order?._id}`}
                          className="btn btn-warning bg-indigo-600 text-xs font-bold"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              path="dashboard/orders"
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
            />
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Orders;
