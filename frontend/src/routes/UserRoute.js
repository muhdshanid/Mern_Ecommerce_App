import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const UserRoute = () => {
    const {userToken} = useSelector(state=>state.authReducer)
  return userToken ? <Outlet/> : <Navigate to={"/login"}/>
}

export default UserRoute