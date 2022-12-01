import React from 'react'
import Nav from '../../components/home/Nav'
import Slider from '../../components/home/Slider';
import Categories from '../../components/home/Categories';
import { useRandomCategoriesQuery } from '../../Store/services/categoryService';
import HomeProducts from '../../components/home/HomeProducts';
const Home = () => {
  const { data, isFetching } = useRandomCategoriesQuery();

  return (
    <>
        <Nav/>
        <div className='mt-[0px]'>
        <Slider/> 
        </div>
        <div className='my-container mt-10'>
          <Categories/>
          {
            !isFetching && data?.categories.length > 0 && data?.categories.map((cat)=>(
              <HomeProducts category={cat} key={cat._id}/>
            ))
          }
        </div>
    </>
  )
}

export default Home