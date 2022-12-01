import React from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {motion} from 'framer-motion'
import { toggleSearch } from "../../Store/reducers/globalReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Search = () => {
    const {searchBar} = useSelector(state=>state.globalReducer)
    const dispatch = useDispatch()
    const [state, setState] = useState("")
    const closeSearch = e => {
        const id = e.target.getAttribute("id");
        id === "search" && dispatch(toggleSearch())
    }
    const navigate = useNavigate()
    const searchProducts = () => {
      if(state === ""){
        return ;
      }
        navigate(`/search-products/${state}/1`)
        dispatch(toggleSearch())
    }
  return searchBar &&  <motion.div id="search" onClick={closeSearch} initial={{opacity:0}}
  animate ={{opacity:1}} className="fixed inset-0 w-full h-full bg-black/50  z-[300]">
  <div  className="flex -mx-8 justify-center">
    <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mt-10 relative  px-8">
      <input
      value={state} 
      onChange={(e)=>setState(e.target.value)}
        type="text"
        placeholder="Search products..."
        name=""
        id=""
        className=" pl-5 pr-14 w-full bg-white h-[50px] rounded outline-none"
      />
      <FiSearch onClick={searchProducts} className=" cursor-pointer absolute top-[13px] right-12 text-2xl text-gray-500" />
    </div>
  </div>
</motion.div>
};

export default Search;
