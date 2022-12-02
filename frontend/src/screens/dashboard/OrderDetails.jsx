import React ,{useRef}from "react";
import { Link, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import { useDeliverOrderMutation, useOrderDetailsQuery } from "../../Store/services/orderService";
import { discount } from "../../utils/discount";
import {BsPrinter} from 'react-icons/bs'
import Wrapper from "./Wrapper";
import currency from "currency-formatter";
import Spinner from "../../components/Spinner";
import ReactToPrint from 'react-to-print';
import {IoChevronBackSharp} from 'react-icons/io5'
const OrderDetails = () => {
  const { id } = useParams();
  const { data, isFetching } = useOrderDetailsQuery(id);
  const total = discount(
    data?.details?.productId.price,
    data?.details?.productId.discount
  ) * data?.details?.quantities;
  const componentRef = useRef();
  const sendOrder = () => {
    deliverOrder(data?.details?._id)
  }
  const [deliverOrder,res] = useDeliverOrderMutation()
  return (
    <Wrapper>
      <ScreenHeader>
        <div className="flex items-center bg-gray-800">
        <Link to={"/dashboard/orders"}><IoChevronBackSharp/></Link><span className="ml-3"> Order Details</span>
        <span className="ml-4"><ReactToPrint
        trigger={() => <button className="flex items-center btn bg-indigo-600 py-1 text-sm font-semibold px-3"><BsPrinter/>
        <span className="ml-2">Print</span></button>}
        content={() => componentRef.current}
      /></span>
      <span className="ml-4">{
      !isFetching &&  !data?.details?.status  && <button onClick={sendOrder} className="btn bg-orange-600 py-1 text-sm font-semibold px-3]">{res?.isLoading ? "Loading" : "Delivered"}</button>
      }</span>
        </div>
      </ScreenHeader>
      {!isFetching ? (
        <div ref={componentRef}>
            <h3 className="capitalize mb-2 text-gray-400">
        Order Number{" "}
        <span className="text-lg text-gray-300 ml-4 mb-1">
          #{data?.details?._id}
        </span>
       
      </h3>
        <div className="flex flex-wrap -mx-5">
          <div className="w-full p-5 md:w-8/12 ">
            <div>
              <table className="   rounded-none md:rounded-md dashboard-table">
                <thead>
                  <tr className="dashboard-tr">
                    <th className="dashboard-th">image</th>
                    <th className="dashboard-th">quantities</th>
                    <th className="dashboard-th">price</th>
                    <th className="dashboard-th">size</th>
                    <th className="dashboard-th">color</th>
                    <th className="dashboard-th">total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="dashboard-td">
                      <img
                        className="w-[50px] h-[50px] rounded-full"
                        src={`/images/${data.details.productId.image1}`}
                        alt="orderimage"
                      />
                    </td>
                    <td className="dashboard-td">{data.details.quantities}</td>
                    <td className="dashboard-td">
                      {" "}
                      {currency.format(
                        discount(
                          data.details.productId.price,
                          data.details.productId.discount
                        ),
                        { code: "USD" }
                      )}
                    </td>
                    <td className="dashboard-td">{data?.details?.size ? data?.details?.size : "No size"}</td>
                    <td className="dashboard-td">
                      <span className="block w-[15px] h-[15px] rounded-full " style={{background:data?.details?.color}}></span>
                    </td>
                    <td className="dashboard-td">{currency.format(total,{code:"USD"})}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full p-5 md:w-4/12 ">
            <div className="bg-gray-900 p-4 rounded-none md:rounded-md ">
                <div className="border-b pb-3 border-b-gray-600">
                    <h4 className="capitalize text-base text-gray-500">customer name</h4>
                    <span className="text-gray-400 text-base font-medium capitalize mt-2">{data.details.userId.name}</span>
                </div>
                <div className="border-b pb-3 border-b-gray-600">
                    <h4 className="capitalize text-base text-gray-500">product</h4>
                    <span className="text-gray-400 text-base font-medium capitalize mt-2">{data.details.productId.title}</span>
                </div>
                <div>
                <h4 className="capitalize text-base text-gray-500">order date</h4>
                <span>{data.details.createdAt}</span>
                </div>
                <div>
                    <h4 className="capitalize text-base text-gray-500 mt-2">shipping address</h4>
                    <div className="mt-2">
                        <span className="text-gray-400 capitalize block">{data.details.address.city}</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-gray-400 capitalize block">{data.details.address.line1}</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-gray-400 capitalize  block">{data.details.address.line2}</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-gray-400 capitalize block">{data.details.address.postal_code}</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default OrderDetails;
