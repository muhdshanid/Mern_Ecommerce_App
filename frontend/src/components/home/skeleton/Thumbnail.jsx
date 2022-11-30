import React from 'react'
import Animate from './Animate'

const Thumbnail = ({height}) => {
  return (
    <div style={{height:height}} className={`relative w-full rounded-md bg-indigo-50 overflow-hidden`}>
        <Animate/>
    </div>
  )
}

export default Thumbnail