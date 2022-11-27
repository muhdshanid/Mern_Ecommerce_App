import { Navigate } from "react-router-dom";
import {useSelector} from 'react-redux'

import React from 'react'

const PrivateRoutes = ({children}) => {
    const authReducer = useSelector(state => state.authReducer)
    const {adminToken} = authReducer;

  return adminToken ? children : <Navigate to={"/auth/admin-login"}/>
}

export default PrivateRoutes