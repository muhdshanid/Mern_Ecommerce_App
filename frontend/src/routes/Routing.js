import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import AdminLogin from "../screens/auth/AdminLogin";
import Products from "../screens/dashboard/Products";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Categories from "../screens/dashboard/Categories";
import AddCategories from "../screens/dashboard/AddCategories";
import UpdateCategory from "../screens/dashboard/UpdateCategory";
import CreateProduct from "../screens/dashboard/CreateProduct";
import EditProduct from "../screens/dashboard/EditProduct";
import Home from "../screens/home/Home";
import Login from "../screens/home/auth/Login";
import Register from "../screens/home/auth/Register";
import Dashboard from "../screens/users/Dashboard";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/user" element={<Dashboard/>} />
        <Route path="auth">
          <Route
            path="admin-login"
            element={
              <PublicRoutes>
                <AdminLogin />
              </PublicRoutes>
            }
          />
        </Route>
        <Route path="dashboard">
          <Route
            path="products"
            element={
              <PrivateRoutes>
                <Products />
              </PrivateRoutes>
            }
          />
          <Route
            path="products/:page"
            element={
              <PrivateRoutes>
                <Products />
              </PrivateRoutes>
            }
          />
          <Route
            path="edit-product/:id"
            element={
              <PrivateRoutes>
                <EditProduct />
              </PrivateRoutes>
            }
          />
          <Route
            path="categories"
            element={
              <PrivateRoutes>
                <Categories />
              </PrivateRoutes>
            }
          />
          <Route
            path="categories/:page"
            element={
              <PrivateRoutes>
                <Categories />
              </PrivateRoutes>
            }
          />
          <Route
            path="create-product"
            element={
              <PrivateRoutes>
                <CreateProduct />
              </PrivateRoutes>
            }
          />
          <Route
            path="update-category/:id"
            element={
              <PrivateRoutes>
                <UpdateCategory />
              </PrivateRoutes>
            }
          />{" "}
          <Route
            path="create-category"
            element={
              <PrivateRoutes>
                <AddCategories />
              </PrivateRoutes>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
