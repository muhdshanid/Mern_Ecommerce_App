import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthLoginMutation } from "../../Store/services/authServices";
import {useDispatch} from 'react-redux'
import { setAdminToken } from "../../Store/reducers/authReducer";
import {useNavigate} from 'react-router-dom'
const AdminLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const [login, res] = useAuthLoginMutation();
  console.log(res, "my res");
  const adminLoginFunction = (e) => {
    e.preventDefault();
    login(state);
  };
  useEffect(() => {
    if(res.isSuccess){
      localStorage.setItem("token",res?.data?.token)
      dispatch(setAdminToken(res?.data?.token))
      navigate("/dashboard/products")
    }
  }, [res.isSuccess]);
  const errors = res?.error?.data?.errors ? res?.error?.data?.errors : [];
  return (
    <div className="bg-black1 h-screen flex justify-center items-center">
      <form
        onSubmit={adminLoginFunction}
        action=""
        className="bg-black2 p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12 rounded-lg"
      >
        <h3 className="mb-4 text-white capitalize font-semibold text-lg">
          dashboard login
        </h3>
        {errors.length > 0 &&
          errors.map((err, key) => (
            <div key={key}>
              <p className="alert-danger">
                {err.msg}
              </p>
            </div>
          ))}
        <div className="mb-4 mt-4">
          <input
            value={state.email}
            onChange={handleInputs}
            type="email"
            className="w-full bg-black1 p-4 rounded outline-none text-white"
            name="email"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <input
            value={state.password}
            onChange={handleInputs}
            type="password"
            className="w-full bg-black1 p-4 rounded outline-none text-white"
            name="password"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <input
            type="submit"
            value={res.isLoading ? "Loading..." : "signin"}
            className="bg-indigo-600 w-full p-4 rounded text-white
            uppercase font-semibold cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
