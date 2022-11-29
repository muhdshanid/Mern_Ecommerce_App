import {createSlice} from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

const customerToken = localStorage.getItem("userToken")
const verifyToken = (keyName) => {
    const storage = localStorage.getItem(keyName) 
    if(storage){
        const decodeToken = jwtDecode(storage)
        const expiresIn = new Date(decodeToken.exp * 1000)
        if(new Date() > expiresIn){
            localStorage.removeItem(keyName)
            return null
        }else{
            return storage
        }
    }else{
        return null
    }
}
const authReducer = createSlice({
    name:"authReducer",
    initialState:{
        adminToken:verifyToken("token"),
        userToken:verifyToken("userToken"),
        user : customerToken ? jwtDecode(customerToken) : null
    },
    reducers:{
        setAdminToken : (state,action) => {
            state.adminToken = action.payload
        },
        setUserToken:(state,action) => {
            state.userToken = action.payload
            state.user = jwtDecode(action.payload)
        },
        logout:(state,{payload}) => {
            localStorage.removeItem(payload)
            if(payload === 'token'){
                state.adminToken = null
            }else if(payload === 'userToken'){
                state.user = null;
                state.userToken = null
            }
           
        }
    }
})

export const {setAdminToken,logout,setUserToken} = authReducer.actions;

export default authReducer.reducer 