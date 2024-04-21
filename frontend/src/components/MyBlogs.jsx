import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import EditBlogForm from "./EditBlogForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBlogsAsync } from "../store/slice/blogSlice";
import { motion } from "framer-motion";
import DeleteModal from "./DeleteModal";

const MyBlogs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { myBlogs } = useSelector((state) => state.blogSlice);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalDelete = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  useEffect(() => {
    dispatch(fetchMyBlogsAsync());
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="md:text-4xl lg:text-5xl text-3xl mx-2 mt-10 mb-6 text-left dark:text-white">
        Manage Your Blogs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isModalOpen && (
          <EditBlogForm
            data={data}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />
        )}
        {isDeleteOpen && (
          <DeleteModal
            id={data._id}
            isDeleteOpen={isDeleteOpen}
            setIsDeleteOpen={setIsDeleteOpen}
          />
        )}
        {myBlogs?.map((post, index) => (
          <motion.div
            initial="hidden"
            animate="visible"
            key={post._id}
            transition={{
              delay: index * 0.25,
              ease: "easeInOut",
              duration: "0.5",
            }}
            viewport={{ amount: 0 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="max-w-md rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                className="w-full h-64 object-cover"
                src={post.featuredImage}
                alt={post.title}
              />
            </a>
            <div className="p-4">
              <a
                href="#"
                className="block text-2xl font-bold text-gray-900 dark:text-white mb-2"
              >
                {post.title}
              </a>
              <div className="flex align-item-end">
                <span className="text-grayfont-bold text-gray-900 dark:text-white">
                  tags:{" "}
                </span>
                <ul className="flex">
                  {post?.tags.map((tag, index) => (
                    <li
                      key={index}
                      className="font-bold text-gray-600 dark:text-white mx-1 text-base cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <a
                        href={`https://github.com/${tag}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        #{tag}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-400 text-base">
                {" "}
                <span className="text-white mr-1"> description:</span>
                {post.content}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Author: {post.author.name}
                </p>
                <div>
                  <button className="mr-2">
                    <AiOutlineEdit
                      size={25}
                      onClick={() => {
                        toggleModal();
                        setData(post);
                      }}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    />
                  </button>
                  <button>
                    <AiOutlineDelete
                      size={25}
                      onClick={() => {
                        toggleModalDelete();
                        setData(post);
                      }}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
