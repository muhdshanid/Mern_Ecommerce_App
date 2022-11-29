import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/home/Header";
import Nav from "../../../components/home/Nav";
import {motion} from 'framer-motion'
import { useUserLoginMutation } from "../../../Store/services/authServices";
import { setUserToken } from "../../../Store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useForm } from "../../../hooks/Form";
import { showError } from "../../../utils/ShowError";

const Login = () => {
  const [loginUser,res] = useUserLoginMutation()
  const [errors, setErrors] = useState([]);
  const onSubmit = e => {
    e.preventDefault()
    loginUser(state)
  }
  useEffect(() => {
    if (res.isError) {
      setErrors(res?.error?.data?.errors);
    }
  }, [res?.error?.data]);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    if(res.isSuccess){
        localStorage.setItem("userToken",res?.data?.token)
        dispatch(setUserToken(res?.data?.token))
        navigate("/user")
    }
  },[res.isSuccess])

  const {state,onChange} = useForm({
    email: "",
    password: "",
  })
  return (
    <>
      <Nav />
      <div className="mt-[70px] pb-[80px]">
        <Header>sign in</Header>
        <div className="flex flex-wrap justify-center">
          <motion.div initial={{opacity:0,x:"-100vw"}}
          animate={{opacity:1,x:0}} className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl-w-4/12 p-6">
            <form onSubmit={onSubmit} className="bg-white rounded-lg -mt-12 border border-gray-200 p-10">
              <h1 className="heading mb-5">sign in</h1>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input value={state.email} onChange={onChange} type="email" 
                name="email" id="email"  className={`form-input ${
                  showError(errors,"email")
                    ? "border-rose-600 bg-rose-50"
                    : "border-gray-300 bg-white"
                }`} placeholder="Email..." />
                {showError(errors,"email") && 
                  <span className="error">{showError(errors,"email")}</span>
                }
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">password</label>
                <input  value={state.password} onChange={onChange} type="password"
                 name="password" id="password"  className={`form-input ${
                  showError(errors,"password")
                    ? "border-rose-600 bg-rose-50"
                    : "border-gray-300 bg-white"
                }`} placeholder="Password..." />
                {showError(errors,"password") && 
                  <span className="error">{showError(errors,"password")}</span>
                }
              </div>
              <div className="mb-4">
                <input disabled={res.isLoading ? true : false} type="submit" value={`${res.isLoading ? "Loading..." : "sign in"}`} className="btn btn-indigo w-full" />
              </div>
              <div>
                <p>Don't have an account ? <span className="capitalize font-medium text-base text-black"><Link to={"/register"}>register</Link></span></p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
