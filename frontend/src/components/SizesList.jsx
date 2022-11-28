import React from 'react'

const SizesList = ({list,deleteSize}) => {
  return list.length > 0 &&
  <>
  <h3 className="right-heading">Sizes List</h3>
   <div className='flex flex-wrap -mx-2'>
    {
        list.map((size)=>(
            <div onClick={()=>deleteSize(size.name)} className='size' key={size.name}>{size.name}</div>
        ))
    }
  </div>
  </>
}

export default SizesList