import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const userOrdersService = createApi({
    reducerPath:"user-orders",
    tagTypes:"orders",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/",
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState();
            const token = reducers?.authReducer?.userToken;
            headers.set("authorization", token ? `Bearer ${token}` : "");
            return headers;
          },
    }),
    endpoints:(builder) => {
        return {
            getUserOrders: builder.query({ 
                query:(data) => {
                    return {
                        url:`orders?page=${data.page}&userId=${data.userId}`,
                        method:"GET",
                    }
                },
                providesTags:['orders']
            }),
            receivedOrder:builder.mutation({
                query:id => {
                    return {
                        url:`order-update?id=${id}&status=received`,
                        method:"PUT"
                    }
                },
                invalidatesTags:["orders"]
              }) 
        }}
})

export const {useGetUserOrdersQuery,useReceivedOrderMutation} = userOrdersService

export default userOrdersService