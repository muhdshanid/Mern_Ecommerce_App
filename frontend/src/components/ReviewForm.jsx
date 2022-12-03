import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "../hooks/Form";
import toast, { Toaster } from 'react-hot-toast'
import { usePostReviewMutation } from "../Store/services/orderService";
import { useEffect } from "react";
const ReviewForm = ({data, stateValue, toggleReview }) => {
  const { state, onChange } = useForm({
    rating: "",
    message: "",
  });
  const [postReview, res] = usePostReviewMutation();
  const addReview = (e) => {
    e.preventDefault();
    postReview({...state,user:data?.details?.userId?._id,product:data?.details?.productId?._id,id:data?.details?._id});
  };
 
  useEffect(()=>{
    if(res?.isSuccess){
        toast.success(res?.data?.msg)
        toggleReview();
    }
  },[res?.isSuccess])
  return stateValue ? (
    <>

            <Toaster position='top-right' reverseOrder={false}/>
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/40 z-[1000]">
      <div className="w-[90%] sm:w-8/12 md:w-6/12 lg:w-4/12">
        <div className="bg-white  p-5 ">
          <div className="flex justify-between items-center">
            <h1 className="mb-3 capitalize text-base font-medium text-gray-700">
              add a review
            </h1>
            <AiOutlineClose
              onClick={() => toggleReview()}
              className="text-rose-800 cursor-pointer"
              size={20}
            />
          </div>
          {res.isError &&
            res?.error?.data?.errors.map((err, i) => (
              <p
                className="bg-rose-50 px-4 py-2.5 text-red-900 rounded font-medium"
                key={i}
              >
                {err.msg}
              </p>
            ))}
          <form onSubmit={addReview}>
            <div className="mb-3">
              <label
                htmlFor="rating"
                className="mb-2 capitalize font-medium block text-sm"
              >
                rating
              </label>
              <select
                value={state.rating}
                onChange={onChange}
                className="form-input"
                name="rating"
                id="rating"
              >
                <option value="">choose a rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <label
              htmlFor="rating"
              className="mb-2 capitalize font-medium block text-sm"
            >
              message
            </label>
            <textarea
              value={state.message}
              onChange={onChange}
              placeholder="Write a message"
              className="form-input"
              name="message"
              id=""
              cols="30"
              rows="5"
            ></textarea>
            <div className="mt-3 flex items-center justify-between">
              <input
                type="submit"
                className="btn btn-indigo rounded"
                value="add review"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  ) : (
    ""
  );
};

export default ReviewForm;
