import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import AccountList from '../../components/home/AccountList'
import Header from '../../components/home/Header'
import Nav from '../../components/home/Nav'
import Spinner from '../../components/Spinner'
import { useGetUserOrdersQuery, useReceivedOrderMutation } from '../../Store/services/userOrdersService'
import currency from 'currency-formatter'
import { discount } from '../../utils/discount'
import Pagination from '../../components/Pagination'
const UserOrder = () => {
    let {page} = useParams()
    page = page ? page : 1
    const {user} = useSelector(state=>state.authReducer)
    const {data,isFetching} = useGetUserOrdersQuery({page,userId:user.id})
    const orderReceived = (id) => {
      updateOrder(id)
    }
    const [updateOrder,res] = useReceivedOrderMutation()
    console.log(res)
  return (
    <>
    <Nav/>
    <div className='mt-[70px]'>
      <Header>
        my orders
      </Header>
      <div className="my-container mt-[20px]">
        <div className="flex flex-wrap -mx-6">
          <div className="w-full md:w-4/12 p-6">
            <AccountList/>
          </div>
          <div className="w-full md:w-8/12 p-6">
            <h1 className='heading -mt-1 mb-6'>orders</h1>
           {
            !isFetching ? data?.orders?.length > 0 ? 
            <>
            <div className="table-container ">
                <table className='w-full'>
                    <thead>
                        <tr className='thead-tr'>
                            <th className='th'>image</th>
                            <th className='th'>name</th>
                            <th className='th'>total</th>
                            <th className='th'>details</th>
                            <th className='th'>received</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.orders?.map(order=>{
                                const total = currency.format(discount(order.productId.price,order.productId.discount) * order.quantities,{code:"USD"}) 
                                return (
                                    <tr key={order._id} className='even:bg-gray-50'>
                                        <td className='td'>
                                            <img className='w-12 h-12 object-cover rounded-full' src={`/images/${order.productId.image1}`} alt={order.productId.title} />
                                        </td>
                                        <td className='td font-medium'>{order.productId.title}</td>
                                        <td className='td font-bold'>{total}</td>
                                        <td className='td '><Link to={`/user-order-details/${order._id}`} className='btn btn-indigo'>Details</Link></td>
                                        <td className="td"> {
                                        order.received ? <span className='font-medium capitalize text-emerald-600'>received</span> : 
                                      <button disabled={order.received ? true : false} onClick={()=>orderReceived(order._id)} className='btn btn-indigo bg-orange-600'>received?</button>
                                      }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Pagination
            theme="light"
              path={`orders`}
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
            />
            </>
            : "no orders" : <Spinner/>
           }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default UserOrder