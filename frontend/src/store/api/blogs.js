import axios from "axios";

export const createBlog = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${window.location.origin}/api/v1/article/create-article`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData, // Pass the FormData object directly as the body
    }
  );
  const data = await response.json();
  return data;
};

export const addComment = async (comment, id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${window.location.origin}/api/v1/comment/create/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify({ comments: comment }), // Convert comment to JSON string
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const fetchAllBlogs = async () => {
  const response = await axios.get(
    `${window.location.origin}/api/v1/article/get-article`
  );
  console.log(response);
  return response;
};

export const fetchMyBlogs = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${window.location.origin}/api/v1/article/get-user-article`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  return response;
};

export const fetchBlogsById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${window.location.origin}/api/v1/article/get-article/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  return response;
};

export const fetchAllCommentByArticle = async (articleId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${window.location.origin}/api/v1/comment/get/comments/${articleId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  return response;
};

export const updateBlog = async (formData, id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${window.location.origin}/api/v1/article/update-article/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData, // Pass the FormData object directly as the body
    }
  );
  const data = await response.json();
  return data;
};

export const deleteBlog = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${window.location.origin}/api/v1/article/article-delete/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }, // Pass the FormData object directly as the body
    }
  );
  const data = await response.json();
  return data;
};
