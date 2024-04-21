import React, { useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { updateBlog } from "../store/api/blogs";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchMyBlogsAsync } from "../store/slice/blogSlice";
const EditBlogForm = ({ data, isOpen, setIsOpen }) => {
  const [tags, setTags] = useState([]);
  const modalRef = useRef(null);
  console.log(data);
  const dispatch = useDispatch();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Append each tag separately
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
    const content = e.target.content.value; // Get the value from the textarea
    formData.append("content", content);

    try {
      const response = await updateBlog(formData, data._id).then(() =>
        toast.success("Blog Updated Successfully")
      );
      dispatch(fetchMyBlogsAsync());
      setIsOpen(false);

      console.log("Blog created successfully:", response);
      // You can add additional logic here, such as showing a success message or redirecting the user
    } catch (error) {
      console.error("Error creating blog:", error);
      // Handle error here, such as displaying an error message to the user
    }
  };

  const options = [
    { label: "trending", value: "#trending" },
    { label: "reels", value: "#reels" },
  ];

  const handleTagChange = (value) => {
    const tags = [];
    value.forEach((tag) => {
      tags.push(tag.value);
    });
    setTags(tags);
    console.log(tags);
  };

  console.log(tags);

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-50 ${
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
        <form onSubmit={onSubmit} className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                defaultValue={data.title}
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Blog title here.."
                required
              />
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
                options={options}
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Desciption
              </label>
              <textarea
                id="content"
                rows="4"
                defaultValue={data.content}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your blog description here"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Edit Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlogForm;
