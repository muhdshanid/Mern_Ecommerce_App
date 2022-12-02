import React from "react";
import AccountList from "../../components/home/AccountList";
import Header from "../../components/home/Header";
import Nav from "../../components/home/Nav";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { discount } from "../../utils/discount";
import currency from "currency-formatter";
import { IoChevronBackSharp } from "react-icons/io5";
import { useOrderDetailsQuery } from "../../Store/services/orderService";
import Spinner from "../../components/Spinner";
const UserOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching } = useOrderDetailsQuery(id);
  const total = currency.format(
    discount(
      data?.details?.productId.price,
      data?.details?.productId.discount
    ) * data?.details?.quantities,
    { code: "USD" }
  );
  return (
    <>
      <Nav />
      <div className="mt-[70px]">
        <Header>order details</Header>
        <div className="my-container mt-[20px]">
          <div className="flex  flex-wrap -mx-6">
            <div className="w-full md:w-4/12 p-6">
              <AccountList />
            </div>
            <div className="w-full md:w-8/12 p-6">
              <h1 className="heading -mt-1 flex items-center">
                <IoChevronBackSharp
                  className=" cursor-pointer text-gray-600"
                  onClick={() => navigate(-1)}
                />
                <span className="ml-3">details</span>
              </h1>
              {!isFetching ? (
                <div className="flex flex-col md:flex-row flex-wrap mt-2 ">
                  <div className="w-[120px] md:w-[160px] md:h-[160px] h-[120px] overflow-hidden">
                    <img
                      src={`/images/${data?.details?.productId?.image1}`}
                      alt=""
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 md:ml-4 md:my-0  my-4">
                    <div className="flex">
                      <h4 className="text-base text-gray-600 capitalize font-normal">
                        order number:
                      </h4>
                      <span className="ml-2 font-medium text-gray-900">
                        {data?.details?._id}
                      </span>
                    </div>
                    <div className="flex mt-1">
                      <h4 className="text-base text-gray-600 capitalize font-normal">
                        product name:
                      </h4>
                      <span className="ml-2 font-medium text-gray-900 capitalize">
                        {data?.details?.productId?.title}
                      </span>
                    </div>
                    <div className="flex mt-1">
                      <h4 className="text-base text-gray-600 capitalize font-normal">
                        order received:
                      </h4>
                      <span className="ml-2 font-medium text-gray-900 capitalize">
                        {data?.details?.received ? "yes" : "no"}
                      </span>
                    </div>
                    <div className="overflow-x-auto mt-4">
                      <table className="w-full">
                        <thead>
                          <tr className="thead-tr">
                            <th className="th">color</th>
                            <th className="th">size</th>
                            <th className="th">price</th>
                            <th className="th">quantities</th>
                            <th className="th">total</th>
                            <th className="th">status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="even:bg-gray-50">
                            <td className="td">
                              <span
                                className="block w-[15px] h-[15px] rounded-full"
                                style={{
                                  backgroundColor: data?.details?.color,
                                }}
                              ></span>
                            </td>
                            <td className="td">{data?.details?.size}</td>
                            <td className="td">
                              {currency.format(
                                discount(
                                  data?.details?.productId?.price,
                                  data?.details?.productId?.discount
                                ),
                                { code: "USD" }
                              )}
                            </td>
                            <td className="td">{data?.details?.quantities}</td>
                            <td className="td">{total}</td>
                            <td className="td">
                              {data?.details?.status ? "yes" : "no"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrderDetails;
