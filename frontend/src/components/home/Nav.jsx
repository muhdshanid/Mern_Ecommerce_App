import React from 'react'
import { Link } from 'react-router-dom'
import {FiSearch} from 'react-icons/fi'
import {BsHandbag} from 'react-icons/bs'
import { useSelector } from 'react-redux'

const Nav = () => {
    const {user,userToken} = useSelector(state=>state.authReducer)
    const logo = "https://png.pngtree.com/template/20190720/ourmid/pngtree-online-shop-logo-design-image_235764.jpg"
  return (
    <nav className='nav'>
        <div className="my-container">
            <div className="flex justify-between items-center">
                <Link to={"/"}>
                    <img className='w-20 h-20 lg:ml-[60px] object-cover' src={logo} alt="logo" />
                </Link>
                <ul className='flex items-center lg:mr-[60px]'>
                    <li className=' nav-li cursor-pointer'><FiSearch size={22}/></li>
                    {
                        userToken ?  <li className='nav-li'><Link className='nav-link' to="/user">{user?.name}</Link></li>
                        :    <li className='nav-li'><Link className='nav-link' to="/login">sign in</Link></li>

                    }
                    <li className='nav-li relative'><Link to={"/cart"}><BsHandbag size={20}/>
                    <span className='nav-circle'>10</span></Link></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Nav