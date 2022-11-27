import {configureStore} from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import authService from './services/authServices'


const store = configureStore({
    reducer:{
        [authService.reducerPath]:authService.reducer,
        "authReducer":authReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authService.middleware),
})

export default store