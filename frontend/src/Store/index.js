import {configureStore} from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import globalReducer from './reducers/globalReducer'
import authService from './services/authServices'
import categoryService from './services/categoryService'
import homeProductsService from './services/homeProductsServices'
import productServices from './services/productService'


const store = configureStore({
    reducer:{
        [authService.reducerPath]:authService.reducer,
        [categoryService.reducerPath]:categoryService.reducer,
        [productServices.reducerPath]:productServices.reducer,
        [homeProductsService.reducerPath]:homeProductsService.reducer,
        "authReducer":authReducer,
        "globalReducer":globalReducer,
        
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authService.middleware)
    .concat([categoryService.middleware,productServices.middleware,homeProductsService.middleware]),
})

export default store