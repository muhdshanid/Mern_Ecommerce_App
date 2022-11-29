import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { useAllCategoriesQuery } from "../../Store/services/categoryService";
import Wrapper from "./Wrapper";
import { TwitterPicker } from "react-color";
import { v4 as uuidv4 } from "uuid";
import { setSuccess } from '../../Store/reducers/globalReducer'

import Colors from "../../components/Colors";
import SizesList from "../../components/SizesList";
import ImagesPreview from "../../components/ImagesPreview";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from 'react-hot-toast'
import { useCreateProductMutation } from "../../Store/services/productService";
import { useDispatch } from "react-redux";
const CreateProduct = () => {
  const { data = [], isFetching } = useAllCategoriesQuery();
  const [value, setValue] = useState("");
  const [state, setState] = useState({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    category: "",
    colors: [],
    image1: "",
    image2: "",
    image3: "",
  });
  const [sizes] = useState([
    { name: "xsm" },
    { name: "sm" },
    { name: "md" },
    { name: "lg" },
    { name: "xl" },
    { name: "1 year" },
    { name: "2 years" },
    { name: "3 years" },
    { name: "4 years" },
    { name: "5 years" },
  ]);
  const [sizeList, setSizeList] = useState([]);
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const saveColors = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.hex);
    setState({
      ...state,
      colors: [...filtered, { color: color.hex, id: uuidv4() }],
    });
  };
  const deleteColor = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.color);
    setState({ ...state, colors: filtered });
  };
  const chooseSize = (sizeObj) => {
    const filtered = sizeList.filter((size) => size.name !== sizeObj.name);
    setSizeList([...filtered, sizeObj]);
  };
  const deleteSize = (name) => {
    const filtered = sizeList.filter((size) => size.name !== name);
    setSizeList(filtered);
  };
  const [preview, setPreview] = useState({
    image1: "",
    image2: "",
    image3: "",
  });
  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({ ...preview, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const createProduct = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("data",JSON.stringify(state))
    formData.append("sizes",JSON.stringify(sizeList))
    formData.append("description",value)
    formData.append("image1",state.image1)
    formData.append("image2",state.image2)
    formData.append("image3",state.image3)
    createNewProduct(formData)
  }
  const [createNewProduct,res] = useCreateProductMutation()
  console.log(res);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
    if(!res.isSuccess){
      res?.error?.data?.errors.map((err)=>{
        toast.error(err.msg)
      })
    }
  },[res?.error?.data?.errors])
  useEffect(()=>{
    if(res.isSuccess){
      dispatch(setSuccess(res?.data?.msg))
      navigate("/dashboard/products")
    }
  },[res?.isSuccess])
  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark" to={"/dashboard/products"}> 
          <i className="bi bi-arrow-left-short mr-2"></i>products list
        </Link>
      </ScreenHeader>
      <Toaster position="top-right" reverseOrder={true}/>
      <div className="flex flex-wrap -mx-3 mt-[-30px]">
        <form onSubmit={createProduct} className="w-full xl:w-8/12 p-2">
          <div className="flex flex-wrap ">
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="title" className="label">
                title
                <input
                  onChange={handleInput}
                  value={state.title}
                  placeholder="title..."
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                />
              </label>
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="price" className="label">
                price
                <input
                  onChange={handleInput}
                  value={state.price}
                  placeholder="price..."
                  type="number"
                  name="price"
                  id="price"
                  className="form-control"
                />
              </label>
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="discount" className="label">
                discount
                <input
                  onChange={handleInput}
                  value={state.discount}
                  placeholder="discount..."
                  type="number"
                  name="discount"
                  id="discount"
                  className="form-control"
                />
              </label>
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="stock" className="label">
                stock
                <input
                  onChange={handleInput}
                  value={state.stock}
                  placeholder="stock..."
                  type="number"
                  name="stock"
                  id="stock"
                  className="form-control"
                />
              </label>
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="categories" className="label">
                categories
              </label>
              {!isFetching ? (
                data?.categories?.length > 0 && (
                  <select
                    onChange={handleInput}
                    value={state.category}
                    className="form-control"
                    name="category"
                    id="categories"
                  >
                    <option value="">Choose category</option>
                    {data?.categories?.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )
              ) : (
                <Spinner />
              )}
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="colors" className="label">
                choose colors
              </label>
              <TwitterPicker onChangeComplete={saveColors} />
            </div>
            <div className="w-full  mt-[-20px] px-3">
              <label htmlFor="sizes" className="label">
                choose sizes
              </label>
              {sizes.length > 0 && (
                <div className="flex flex-wrap -mx-3">
                  {sizes.map((size) => (
                    <div
                      onClick={() => chooseSize(size)}
                      key={size.name}
                      className="size"
                    >
                      {size.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full pt-2 px-2">
              <label htmlFor="image1" className="label">
                image 1
              </label>
              <input
                onChange={imageHandle}
                className="input-file"
                type="file"
                name="image1"
                id="image1"
              />
            </div>
            <div className="w-full pt-2 px-2">
              <label htmlFor="image2" className="label">
                image 2
              </label>
              <input
                onChange={imageHandle}
                className="input-file"
                type="file"
                name="image2"
                id="image2"
              />
            </div>
            <div className="w-full pt-2 px-2">
              <label htmlFor="image3" className="label">
                image 3
              </label>
              <input
                onChange={imageHandle}
                className="input-file"
                type="file"
                name="image3"
                id="image3"
              />
            </div>
            <div className="w-full pt-2 px-2">
              <label htmlFor="description" className="label">
                Description
              </label>
              <ReactQuill  theme="snow" id="description" placeholder="Description..." value={value} onChange={setValue} />{" "}
            </div>
            <div className="w-full pt-2 px-2">
                <input type="submit" disabled={res.isLoading ? true : false} value={res.isLoading ? "Loading..." : "Save Product"} className="btn btn-indigo"/>
            </div>
          </div>
        </form>
        <div className="w-full xl:w-4/12 p-3">
          <Colors deleteColor={deleteColor} colors={state.colors} />
          <SizesList deleteSize={deleteSize} list={sizeList} />
          <ImagesPreview url={preview.image1} heading="image 1" />
          <ImagesPreview url={preview.image2} heading="image 2" />
          <ImagesPreview url={preview.image3} heading="image 3" />
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
