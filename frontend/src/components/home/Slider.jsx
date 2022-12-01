import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useRandomCategoriesQuery } from "../../Store/services/categoryService";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import img1 from '../../assets/images/slider/1.jpg'
import img2 from '../../assets/images/slider/2.jpg'
import img3 from '../../assets/images/slider/3.jpg'

const Slider = () => {
  const { data, isFetching } = useRandomCategoriesQuery();
  let images = [img1,img2,img3]
  return isFetching ? (
    <div className="my-container h-[70vh] flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {data?.categories.length > 0 &&
        data?.categories.map((cat, index) => (
          <>
            <SwiperSlide key={index} className="slide">
              <div  
                className={`slide-img `}
              >
                <img className="w-full h-full object-cover" src={images[index]} alt="banner" />
              </div>
              <div className="absolute inset-0 w-full h-full bg-black/50">
                <div className="my-container h-[70vh] flex  flex-col items-center justify-center ">
                  <h1 className="text-white text-xl font-medium capitalize">
                    {cat.name}
                  </h1>
                  <div className="mt-10 ">
                    <Link to={`/cat-products/${cat.name}`} className="btn btn-indigo">
                      browse collection
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            
          </>
        ))}
    </Swiper>
  );
};

export default Slider;
