import React from 'react'
import { Link } from 'react-router-dom'
import {FiSearch} from 'react-icons/fi'
import {BsHandbag} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import Search from './Search'
import { toggleSearch } from '../../Store/reducers/globalReducer'
const Nav = () => {
    const {user,userToken} = useSelector(state=>state.authReducer)
    const {searchBar} = useSelector(state=>state.globalReducer)
    const {items,total} = useSelector(state=>state.cartReducer)
    console.log(total);
    const dispatch = useDispatch()
    const logo = "https://dcassetcdn.com/design_img/2719012/536767/536767_14796260_2719012_82686f40_image.png"
  return (
    <>
    <nav className='nav '>
        <div className="my-container  ">
            <div className="flex  justify-between items-center">
                <Link to={"/"}>
                    <img className='w-20 h-15 ml-[-20px] sm:ml-[20px]  -z-40 object-cover' src={logo} alt="logo" />
                </Link>
                <ul className='flex items-center sm:mr-[60px]'>
                    <li  onClick={()=>dispatch(toggleSearch())} className=' nav-li cursor-pointer'><FiSearch size={22}/></li>
                    {
                        userToken ?  <li className='nav-li'><Link className='nav-link' to="/user">{user?.name}</Link></li>
                        :    <li className='nav-li'><Link className='nav-link' to="/login">sign in</Link></li>

                    }
                    <li className='nav-li relative'><Link to={"/cart"}><BsHandbag size={20}/>
                    <span className='nav-circle'>{items}</span></Link></li>
                </ul>
            </div>
        </div>
    </nav>
    <Search/>
    </>
  )
}

export default Nav