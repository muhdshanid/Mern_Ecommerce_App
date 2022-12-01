import React from 'react'
import Skeleton from './skeleton/Skeleton'
import Text from './skeleton/Text'
import Thumbnail from './skeleton/Thumbnail'

const ProductSkeleton = () => {
  return (
    <div className="flex flex-wrap -mx-4 mb-10">
            {[1, 2, 3, 4].map((item) => (
              <div
                className="w-6/12 p-4 sm:w-4/12 md:w-3/12 lg:w-4/12 xl:w-3/12"
                key={item}
              >
                <Skeleton>
                  <Thumbnail height="320px"/>
                  <Text mt="15px" />
                </Skeleton>
              </div>
            ))}
          </div>
  )
}

export default ProductSkeleton