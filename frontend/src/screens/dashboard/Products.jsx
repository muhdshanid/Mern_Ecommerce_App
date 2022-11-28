import React from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../components/AdminNav";
import ScreenHeader from "../../components/ScreenHeader";
import SideBar from "../../components/SideBar";
import Wrapper from "./Wrapper";

const Products = () => {
  return (
    <Wrapper>
      <Link className="btn-dark" to={"/dashboard/create-product"}>
        create product<i className="bi bi-plus"></i>
      </Link>
    </Wrapper>
  );
};

export default Products;
