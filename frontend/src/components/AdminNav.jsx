import React from 'react'
import {useDispatch} from 'react-redux'
import { logout } from '../Store/reducers/authReducer'
const AdminNav = ({openSideBar}) => {
    const dispatch = useDispatch()
    const adminLogout = () => {
        dispatch(logout("token"))
    }
  return (
    <nav className=' left-0 sm:left-64  right-0 mx-4 z-50'>
        <div className='bg-gray-800 w-full flex p-2 sm:justify-end justify-between items-center '>
           <i onClick={openSideBar} className="bi bi-filter-left cursor-pointer text-white text-2xl sm:hidden"></i>
            <button onClick={adminLogout} className='py-2 px-4  bg-indigo-600 text-white rounded-md capitalize '>Logout</button>
        </div>
    </nav>
  )
}

export default AdminNav