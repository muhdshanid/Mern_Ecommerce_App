import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import globalReducer from "./reducers/globalReducer";
import authService from "./services/authServices";
import categoryService from "./services/categoryService";
import homeProductsService from "./services/homeProductsServices";
import paymentService from "./services/paymentServices";
import productServices from "./services/productService";

const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productServices.reducerPath]: productServices.reducer,
    [homeProductsService.reducerPath]: homeProductsService.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
    cartReducer: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authService.middleware)
      .concat([
        categoryService.middleware,
        productServices.middleware,
        homeProductsService.middleware,
        paymentService.middleware,
      ]),
});

export default store;
