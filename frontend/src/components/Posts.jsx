import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogsAsync,
  fetchBlogsByIdAsync,

} from "../store/slice/blogSlice";
import { Link } from "react-router-dom";

const PostComponent = () => {
  const { blogs, isLoading } = useSelector((state) => state.blogSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogsAsync());
  }, [dispatch]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return isLoading ? (
    <div class="flex flex-row gap-2 w-full h-72 items-center justify-center">
      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.2s]"></div>
      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <h1 className="md:text-4xl lg:text-5xl text-3xl mx-2 mt-10 mb-6 text-left dark:text-white">
        Read your favourite blogs here...
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((post, index) => (
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
            variants={variants}
            className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          >
            <Link
              to="/blog-details"
              onClick={() => dispatch(fetchBlogsByIdAsync(post._id))}
            >
              <img
                className="w-full h-64 object-cover"
                src={post.featuredImage}
                alt={post.title}
              />
            </Link>
            <div className="p-4">
              <a
                href="#"
                className="block text-2xl font-bold text-gray-900 dark:text-white mb-2"
              >
                {post.title}
              </a>
              <p className="text-gray-700 dark:text-gray-400 text-base">
                {post.content}
              </p>
              <div className="flex items-end mt-2">
                <div className="mt-4 flex flex-col  justify-between ">
                  <p className="text-gray-600 dark:text-gray-300">
                    Author: {post.author.name}
                  </p>
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
                  <p className="text-gray-600 dark:text-gray-300">
                    {new Date(post.createdAt).toDateString()}
                  </p>
                </div>
                <div className="">
                  <Link
                    onClick={() => dispatch(fetchBlogsByIdAsync(post._id))}
                    to="/blog-details"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Read more..
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PostComponent;
