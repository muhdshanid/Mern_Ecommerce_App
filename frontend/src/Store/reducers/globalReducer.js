import {createSlice} from '@reduxjs/toolkit'

const globalReducer = createSlice({
    name:"global",
    initialState:{
        success:"",
        searchBar:false
    },
    reducers:{
        setSuccess : (state,action) => {
            state.success = action.payload
        },
        clearMessage:(state) => {
            state.success = ""
        },
        toggleSearch:(state) => {
            state.searchBar = !state.searchBar
        }
    }
})

export const {setSuccess,clearMessage,toggleSearch} = globalReducer.actions

export default globalReducer.reducer