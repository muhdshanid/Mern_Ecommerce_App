import React from 'react'
import Animate from './Animate'

const Text = ({mt}) => {
  return (
    <div style={{marginTop:mt}} className='w-full h-4 rounded-md  bg-indigo-50 overflow-hidden relative'>
        <Animate/>
    </div>
  )
}

export default Text