import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/home/Header";
import Nav from "../../../components/home/Nav";
import { motion } from "framer-motion";
import { useState } from "react";
import { useUserRegisterMutation } from "../../../Store/services/authServices";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../Store/reducers/authReducer";
import {setSuccess} from '../../../Store/reducers/globalReducer'
import { useForm } from "../../../hooks/Form";
import { showError } from "../../../utils/ShowError";
const Register = () => {
  const [registerUser, res] = useUserRegisterMutation();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    if (res.isError) {
      setErrors(res?.error?.data?.errors);
    }
  }, [res?.error?.data]);
  useEffect(()=>{
    if(res.isSuccess){
        localStorage.setItem("userToken",res?.data?.token)
        dispatch(setUserToken(res?.data?.token))
        dispatch(setSuccess(res?.data?.msg))
        navigate("/user")
    }
  },[res.isSuccess])
  const navigate = useNavigate()
  
  const onSubmit = (e) => {
    e.preventDefault();
    registerUser(state);
  };
  const {state,onChange} = useForm({
    name: "",
    email: "",
    password: "",
  })
  return (
    <>
      <Nav />
      <div className="mt-[70px] pb-[80px]">
        <Header>sign up</Header>
        <div className="flex flex-wrap justify-center">
          <motion.div
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full sm:w-8/12 md:w-8/12 lg:w-6/12 xl-w-4/12 p-6"
          >
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-lg -mt-12 border border-gray-200 p-10"
            >
              <h1 className="heading mb-5">sign up</h1>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  name
                </label>
                <input
                  onChange={onChange}
                  value={state.name}
                  type="text"
                  name="name"
                  id="name"
                  className={`form-input ${
                    showError(errors,"name")
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Name..."
                />
                {showError(errors,"name") && (
                  <span className="error">{showError(errors,"name")}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  onChange={onChange}
                  value={state.email}
                  type="email"
                  name="email"
                  id="email"
                  className={`form-input ${
                    showError(errors,"email")
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Email..."
                />
                {showError(errors,"email") && (
                  <span className="error">{showError(errors,"email")}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  password
                </label>
                <input
                  onChange={onChange}
                  value={state.password}
                  type="password"
                  name="password"
                  id="password"
                  className={`form-input ${
                    showError(errors,"password")
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Password..."
                />
                {showError(errors,"password") && (
                  <span className="error">{showError(errors,"password")}</span>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="submit"
                  value={`${res.isLoading ? "Loading..." : "sign up"}`}
                  disabled={res.isLoading ? true : false}
                  className="btn btn-indigo w-full"
                />
              </div>
              <div>
                <p>
                  Already have an account ?{" "}
                  <span className="capitalize font-medium text-base text-black">
                    <Link to={"/login"}>sign in</Link>
                  </span>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Register;
