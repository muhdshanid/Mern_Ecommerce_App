import React from "react";
import { Virtual } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { useAllCategoriesQuery } from "../../Store/services/categoryService";
import "swiper/css";
import "swiper/css/virtual";
import img2 from '../../assets/images/slider/2.jpg'
import img3 from '../../assets/images/slider/3.jpg'
import img4 from '../../assets/images/slider/4.jpg'
import img5 from '../../assets/images/slider/5.jpg'
import { Link } from "react-router-dom";
import Skeleton from "./skeleton/Skeleton";
import Thumbnail from "./skeleton/Thumbnail";
const Categories = () => {
  const { data, isFetching } = useAllCategoriesQuery();
  let i = 0;
  let images = [img2,img3,img4,img5]
  return isFetching
    ? <div className="flex flex-wrap -mx-4 mb-10">
        {
            [1,2,3,4,5,6].map(item=>(
                <div className="w-6/12 p-4 sm:w-4/12 md:w-3/12 lg:w-[20%] xl-w-2/12" key={item}>
                    <Skeleton>
                        <Thumbnail height="150px"/>
                    </Skeleton>
                </div>
            ))
        }
    </div>
    : data?.categories.length > 0 && (
        <Swiper
          className="w-full h-[150px] mb-10"
          modules={[Virtual]}
          spaceBetween={20}
          slidesPerView={3}
          virtual
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1080: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
          }}
        >
          {data?.categories.map((cat, ind) => {
            if(i >=4){
                i = 1
            }else{
                i++
            }
            return (
                <SwiperSlide
                className="w-full h-[200px] overflow-hidden rounded-lg relative"
                key={ind}
                virtualIndex={ind}
              >
                
                    <div className="w-full h-[150px] rounded-lg overflow-hidden">
                        <img src={images[i-1]} className='w-full h-[300px] object-cover' alt="category" />
                    </div>
                    <div className="absolute inset-0 w-full h-full bg-black/50 flex items-center justify-center p-4">
                        <Link to={`/cat-products/${cat.name}`} className="text-white text-base font-medium capitalize">{cat.name}</Link>
                    </div>
                
              </SwiperSlide>
            )
          })}
        </Swiper>
      );
};

export default Categories;
