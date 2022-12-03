import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ScreenHeader from '../../components/ScreenHeader'
import Spinner from '../../components/Spinner'
import { setSuccess } from '../../Store/reducers/globalReducer'
import { useFetchCategoryQuery, useUpdateCategoryMutation } from '../../Store/services/categoryService'
import Wrapper from './Wrapper'

const UpdateCategory = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {data,isFetching} = useFetchCategoryQuery(id)
    const [updateCategory,res] =  useUpdateCategoryMutation()
    useEffect(()=>{
        data?.category && setState(data?.category?.name)
    },[data?.category])
    useEffect(()=>{
        if(res?.isSuccess){
          dispatch(setSuccess(res?.data?.message))
            navigate("/dashboard/categories")
        }
       
    },[res?.isSuccess])
     const errors = res?.error?.data?.errors ? res?.error?.data?.errors : []
    const [state, setState] = useState("")
     const updateSubmit = (e) => {
         e.preventDefault()
         updateCategory({name:state,id})
     }
  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark " to={'/dashboard/categories'}><i className="bi bi-arrow-left-short mr-2"></i>category item</Link>
      </ScreenHeader>
      {
        !isFetching ? <form onSubmit={updateSubmit} className=' w-full md:w-8/12 '>
        <h3 className='text-lg capitalize mb-3'>update category</h3>
        {
            errors.length > 0 && errors.map((err,key)=>(
                <p className='alert-danger' key={key}>{err.msg}</p>
            ))
        }
        <div className="mb-3">
            <input type="text" value={state} onChange={(e)=>setState(e.target.value)} name='' className='form-control' placeholder='Category Name...'/>
        </div>
        <div className="mb-3">
            <input type="submit" value="Update Category" className='btn btn-indigo' />
        </div>
      </form> : <Spinner/>
      }
    </Wrapper>
  )
}

export default UpdateCategory