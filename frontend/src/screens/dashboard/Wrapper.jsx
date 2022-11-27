import React from 'react'
import { useState } from 'react'
import AdminNav from '../../components/AdminNav'
import SideBar from '../../components/SideBar'
const Wrapper = ({children}) => {
    const [left, setLeft] = useState("-left-64")
    const openSideBar = () => {
        setLeft("left-0")
    }
    const closeSideBar = ()=> {
        setLeft("-left-64")
    }
  return (
    <>
    <SideBar closeSideBar={closeSideBar} left={left} />
    <AdminNav openSideBar={openSideBar}/>
    <section className=' ml-0 sm:ml-64 bg-gray-900 min-h-screen pt-28 px-4'>
      <div className='bg-gray-800 text-white p-4'>
        {children}
      </div>
    </section>
    </>
  )
}

export default Wrapper