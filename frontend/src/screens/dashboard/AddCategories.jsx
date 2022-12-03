import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import ScreenHeader from '../../components/ScreenHeader'
import { setSuccess } from '../../Store/reducers/globalReducer'
import { useCreateMutation } from '../../Store/services/categoryService'
import Wrapper from './Wrapper'

const AddCategories = () => {
    const [saveCategory,res] = useCreateMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        if(res?.isSuccess){
          dispatch(setSuccess(res?.data?.message))
            navigate("/dashboard/categories")
        }
       
    },[res?.isSuccess])
    const errors = res?.error?.data?.errors ? res?.error?.data?.errors : []
    const [state, setState] = useState("")
    const submitCategory = (e) => {
        e.preventDefault()
        saveCategory({name:state})
    }
  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark " to={'/dashboard/categories'}><i className="bi bi-arrow-left-short mr-2"></i>category list</Link>
      </ScreenHeader>
      <form onSubmit={submitCategory} className=' w-full md:w-8/12 '>
        <h3 className='text-lg capitalize mb-3'>create category</h3>
        {
            errors.length > 0 && errors.map((err,key)=>(
                <p className='alert-danger' key={key}>{err.msg}</p>
            ))
        }
        <div className="mb-3">
            <input type="text" value={state} onChange={(e)=>setState(e.target.value)} name='' className='form-control' placeholder='Category Name...'/>
        </div>
        <div className="mb-3">
            <input type="submit" value={res?.isLoading ? "loading..." : "Create Category"} className='btn btn-indigo' />
        </div>
      </form>
    </Wrapper>
  )
}

export default AddCategories