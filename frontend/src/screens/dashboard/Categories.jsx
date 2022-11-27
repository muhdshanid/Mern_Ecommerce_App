import React from "react";
import { Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";

const Categories = () => {
  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark" to={'/dashboard/create-category'}>Add category<i class="bi bi-plus"></i></Link>
      </ScreenHeader>
    </Wrapper>
  );
};

export default Categories;
