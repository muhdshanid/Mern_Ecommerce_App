import React from 'react'
import { Link } from 'react-router-dom'
import ScreenHeader from '../../components/ScreenHeader'
import Wrapper from './Wrapper'

const AddCategories = () => {
  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark" to={'/dashboard/category'}><i class="bi bi-arrow-left-short mr-2"></i>category list</Link>
      </ScreenHeader>
      <form className=' w-full md:w-8/12 '>
        <h3 className='text-lg capitalize mb-3'>create category</h3>
        <div className="mb-3">
            <input type="text" name='' className='form-control' placeholder='Category Name...'/>
        </div>
        <div className="mb-3">
            <input type="text" value="Create Category" class='btn-indigo' />
        </div>
      </form>
    </Wrapper>
  )
}

export default AddCategories