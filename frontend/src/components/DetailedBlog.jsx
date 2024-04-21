import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../store/api/blogs";
import { fetchCommentsAsync } from "../store/slice/blogSlice";
import { useNavigate } from "react-router-dom";

const DetailedBlog = () => {
  const { currentBlog, comment } = useSelector((state) => state.blogSlice);
  const dispatch = useDispatch();
  const blog = currentBlog;
  console.log(comment);

  const nagivate = useNavigate();

  useEffect(() => {
    dispatch(fetchCommentsAsync(blog?._id));
  }, [dispatch]);

  const handledTagClick = (e) => {
    e.preventDefault();
    window.location.href = "https://github.com/Pavanmum";


  }

  const [newComment, setNewComment] = useState("");

  const handleComment = async () => {
    try {
      // Call the addComment API function with the new comment content and blog ID
      const comment = await addComment(newComment, blog?._id);
      console.log("Comment added:", comment);
      dispatch(fetchCommentsAsync(blog?._id));
      // Clear the input field after adding the comment
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };


  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-xl overflow-hidden shadow-md">
      <div className="bg-gray-100 flex justify-end dark:bg-gray-100 p-6">
        <p
          onClick={() => nagivate(-1)}
          className="dark:bg-white-600  text-black py-2 px-4 border-spacing-1 rounded-md   cursor-pointer"
        >
          Back
          </p>
        {/* </button> */}
      </div>
      <div className="p-6"> 
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{blog?.title}</h2>
        <div className="relative mb-6">
          <img
            src={blog?.featuredImage}
            alt={blog?.title}
            className="object-cover w-full h-96 rounded-lg"
          />
        </div>
        <p className="text-gray-600 mt-2">Author: {blog?.author.name}</p>
        <div className="flex align-item-end">
  <span className="text-gray">tags: </span>
  <ul className="flex">
    {blog?.tags.map((tag, index) => (
      <li
        key={index}
        className="text-gray-700 dark:text-gray-800 mx-1 text-base cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
      >
        <a href={`https://github.com/${tag}`} target="_blank" rel="noopener noreferrer">
          #{tag}
        </a>
      </li>
    ))}
  </ul>
</div>

        <p className="text-gray-600 dark:text-gray-600">Date :
          {new Date(blog?.createdAt).toDateString()}
        </p>

        <div className="mt-4">
          <p className="text-gray-700">{blog?.content}</p>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Comments</h3>
          <div className="mb-4 flex flex-col gap-3">
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md w-full"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleComment}
              className="dark:bg-gray-700 w-fit text-white py-2 px-4 rounded-md ml-2"
            >
              Add Comment
            </button>
          </div>
          {comment?.map((comment) => (
            <div
              key={comment.id}
              className="border border-gray-200 p-4 rounded-md mb-4"
            >
              <p className="text-gray-800 font-semibold">
                {comment.author.name}
              </p>
              <p className="text-gray-700">{comment.comments}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedBlog;
