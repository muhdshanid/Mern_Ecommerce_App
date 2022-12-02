import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../components/home/Nav";
import currency from "currency-formatter";
import { discount } from "../../utils/discount";
import Quantity from "../../components/home/Quantity";
import { motion } from "framer-motion";
import { BsTrash } from "react-icons/bs";
import {
  decQuantity,
  incQuantity,
  removeItem,
} from "../../Store/reducers/cartReducer";
import { Link, useNavigate } from "react-router-dom";
import { useSendPaymentMutation } from "../../Store/services/paymentServices";
const Cart = () => {
  const { cart, total } = useSelector((state) => state.cartReducer);
  const { userToken, user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const inc = (id) => {
    dispatch(incQuantity(id));
  };
  const dec = (id) => {
    dispatch(decQuantity(id));
  };
  const remove = (id) => {
    // verify user that you are really want to delete the itme
    if (window.confirm("Are you sure you want  to delete this item?")) {
      dispatch(removeItem(id));
    }
  };
  const navigate = useNavigate();
  const pay = () => {
    if (userToken) {
      doPayment({ cart, id: user.id });
    } else {
      navigate("/login");
    }
  };
  const [doPayment, res] = useSendPaymentMutation();
  useEffect(() => {
    if (res?.isSuccess) {
      window.location.href = res?.data?.url;
    }
  }, [res]);
  console.log(user);
  return (
    <>
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="my-container mt-28"
      >
        {cart.length > 0 ? (
          <>
            <div className="table-container ">
              <table className="w-full">
                <thead>
                  <tr className="thead-tr">
                    <th className="th">image</th>
                    <th className="th">name</th>
                    <th className="th">color</th>
                    <th className="th">size</th>
                    <th className="th">price</th>
                    <th className="th">quantities</th>
                    <th className="th">total</th>
                    <th className="th">delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const total = currency.format(
                      discount(item.price, item.discount) * item.quantity,
                      { code: "USD" }
                    );
                    return (
                      <tr key={item._id} className="even:bg-gray-50">
                        <td className="td">
                          <img
                            className="w-12 h-12 object-cover rounded-full"
                            src={`/images/${item.image1}`}
                            alt={item.title}
                          />
                        </td>
                        <td className="td font-medium">{item.title}</td>
                        <td className="td ">
                          <span
                            className="block w-[15px] h-[15px] rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </td>
                        <td className="td ">
                          <span className="font-semibold">{item.size}</span>
                        </td>
                        <td className="td font-bold text-gray-900">
                          {currency.format(
                            discount(item.price, item.discount),
                            { code: "USD" }
                          )}
                        </td>
                        <td className="td ">
                          <Quantity
                            theme="indigo"
                            quantity={item.quantity}
                            inc={() => inc(item._id)}
                            dec={() => dec(item._id)}
                          />
                        </td>
                        <td className="td font-bold">{total}</td>
                        <td className="td">
                          <span
                            onClick={() => remove(item._id)}
                            className=" cursor-pointer"
                          >
                            <BsTrash
                              className="text-rose-600
                                        "
                              size={20}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-indigo-50 p-4 flex justify-end">
              <div>
                <span className="text-lg font-semibold text-indigo-800 mr-10 mt-5 rounded-md">
                  {currency.format(total, { code: "USD" })}
                </span>
                <button
                  className="btn bg-indigo-600 text-sm font-medium py-2.5"
                  onClick={pay}
                >
                  {res.isLoading ? "Loading..." : "Checkout"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-md text-sm font-medium text-indigo-800">
            Cart is empty
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Cart;
