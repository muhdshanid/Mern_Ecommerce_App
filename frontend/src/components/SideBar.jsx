import React from 'react'
import {Link} from 'react-router-dom'
const SideBar = ({left,closeSideBar}) => {
  return (
    <div className={`fixed top-0 ${left} sm:left-0 w-64 h-screen bg-gray-800 z-10 transition-all`}>
      <div className='bg-white p-4'>
        <h3 className="font-bold bg-black2 text-white rounded-xl pl-2 sm:w-full w-40">Online Shop</h3>
        <i onClick={closeSideBar} class="bi bi-x-lg sm:hidden absolute top-4 right-4 block cursor-pointer text-lg"></i>
      </div>
      <ul className='mt-4 '>
        <li className='px-4 py-3 transition-all cursor-pointer text-white flex items-center hover:bg-gray-600'>
        <i class="bi bi-card-list mr-2 inline-block text-lg"></i><Link
        className='text-base capitalize' to={"/dashboard/products"}>Products</Link>
        </li>
        <li className='px-4 py-3 transition-all cursor-pointer text-white flex items-center hover:bg-gray-600'>
        <i class="bi bi-bag-check mr-2 inline-block text-lg"></i><Link
        className='text-base capitalize' to={"/dashboard/products"}>orders</Link>
        </li>
        <li className='px-4 py-3 transition-all cursor-pointer text-white flex items-center hover:bg-gray-600'>
        <i class="bi bi bi-people-fill mr-2 inline-block text-lg"></i><Link
        className='text-base capitalize' to={"/dashboard/products"}>customers</Link>
        </li>
        <li className='px-4 py-3 transition-all cursor-pointer text-white flex items-center hover:bg-gray-600'>
        <i class="bi bi-bar-chart mr-2 inline-block text-lg"></i><Link
        className='text-base capitalize' to={"/dashboard/categories"}>categories</Link>
        </li>
      </ul>
    </div>
  )
}

export default SideBar