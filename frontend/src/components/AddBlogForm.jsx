import React, { useRef, useState } from "react";
import { createBlog } from "../store/api/blogs";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import { useDispatch } from "react-redux";
import { fetchBlogsAsync, fetchMyBlogsAsync } from "../store/slice/blogSlice";

const AddBlogForm = ({ isOpen, setIsOpen }) => {
  const modalRef = useRef(null);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
    setSendNotify(true);
    try {
      const response = await createBlog(formData);
      dispatch(fetchMyBlogsAsync());
      dispatch(fetchBlogsAsync());
      toast.success("Blog created successfully:", response);
      setSendNotify(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };
  const [sendNotify, setSendNotify] = useState(false);


  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const options = [];

  const handleTagChange = (value) => {
    const tags = [];
    value.forEach((tag) => {
      tags.push(tag.value);
    });
    setTags(tags);
    console.log(tags);
  };

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed overflow-hidden top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
      >
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create New Blog
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="crud-modal"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form className="p-4 md:p-5" onSubmit={onSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Blog title here.."
                required // Added required attribute
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your blog content here"
                required // Added required attribute
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required // Added required attribute
              >
                <option value="technology">Technology</option>
                <option value="science">Science</option>
                <option value="health_fitness">Health & Fitness</option>
                <option value="travel">Travel</option>
                <option value="food_recipes">Food & Recipes</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="fashion_beauty">Fashion & Beauty</option>
                <option value="business_finance">Business & Finance</option>
                <option value="education">Education</option>
                <option value="arts_culture">Arts & Culture</option>
                <option value="sports">Sports</option>
              </select>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="featuredImage"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Featured Image
              </label>
              <input
                type="file"
                id="featuredImage"
                name="featuredImage"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required // Added required attribute
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="tags"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tags
              </label>
              <CreatableSelect
                onChange={handleTagChange}
                isMulti
                components={{
                  IndicatorSeparator: null,
                  NoOptionsMessage: () => "Type to add tag",
                }}
                options={options}
                required // Added required attribute
              />
            </div>
          </div>
          <button
                  type="submit"
                  className="inline-flex w-fit items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-900 hover:bg-blue-800 transition ease-in-out duration-150">
                    <span className={`text-nowrap`}>
                    +  Add Blog</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  > 
                  </svg>
                  {sendNotify && (
                    <span className="ms-5 rounded-full h-5 w-2 border-4 border-white animate-spin"></span>
                  )}
                  
                </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogForm;
