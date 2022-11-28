import {configureStore} from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import globalReducer from './reducers/globalReducer'
import authService from './services/authServices'
import categoryService from './services/categoryService'


const store = configureStore({
    reducer:{
        [authService.reducerPath]:authService.reducer,
        [categoryService.reducerPath]:categoryService.reducer,
        "authReducer":authReducer,
        "globalReducer":globalReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authService.middleware).concat([categoryService.middleware]),
})

export default store