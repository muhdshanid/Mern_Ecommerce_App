import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccountList from '../../components/home/AccountList'
import Header from '../../components/home/Header'
import Nav from '../../components/home/Nav'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useVerifyPaymentQuery } from '../../Store/services/paymentServices'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { emptyCart } from '../../Store/reducers/cartReducer'
const Dashboard = () => {
  const [params] = useSearchParams()
  const {success} = useSelector(state=>state.globalReducer)
  const id = params.get('session_id')
  const {user} = useSelector(state =>state.authReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {data,isSuccess} = useVerifyPaymentQuery(id,{skip:id ? false : true})
  useEffect(()=>{
    if(isSuccess){
      localStorage.removeItem("cart")
      toast.success(data.msg)
      dispatch(emptyCart())
      navigate("/user")
    }
  },[isSuccess,success])
  return (
    <>
    <Nav/>
    <Toaster position='top-right' reverseOrder={false}/>
    <div className='mt-[70px]'>
      <Header>
        my account
      </Header>
      <div className="my-container mt-[20px]">
        <div className="flex flex-wrap -mx-6">
          <div className="w-full md:w-4/12 p-6">
            <AccountList/>
          </div>
          <div className="w-full md:w-8/12 p-6">
            <h1 className='heading -mt-1'>name</h1>
            <span className='block mt-1 capitalize font-medium text-sm'>{user?.name}</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard