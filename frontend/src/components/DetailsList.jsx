import React from 'react'

const DetailsList = ({label,data}) => {
  return (
    <div className="flex border-b py-2.5">
    <h4 className="text-base text-gray-600 capitalize font-normal">
      {label}:
    </h4>
    <span className="ml-2 font-medium text-gray-900">
      {data}
    </span>
  </div>
  )
}

export default DetailsList