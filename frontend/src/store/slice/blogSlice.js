import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllBlogs,
  fetchAllCommentByArticle,
  fetchBlogsById,
  fetchMyBlogs,
} from "../api/blogs";

export const fetchBlogsAsync = createAsyncThunk("fetchBlogs", async () => {
  const response = await fetchAllBlogs();
  console.log(response);
  return response;
});

export const fetchMyBlogsAsync = createAsyncThunk("fetchMyBlogs", async () => {
  const response = await fetchMyBlogs();
  console.log(response);
  return response;
});

export const fetchBlogsByIdAsync = createAsyncThunk(
  "fetchBlogsById",
  async (id) => {
    const response = await fetchBlogsById(id);
    console.log(response);
    return response;
  }
);

export const fetchCommentsAsync = createAsyncThunk(
  "fetchMyComments",
  async (articleId) => {
    const response = await fetchAllCommentByArticle(articleId);
    console.log(response);
    return response;
  }
);

const initialState = {
  blogs: [],
  error: null,
  isLoading: false,
  myBlogs: [],
  currentBlog: null,
  comment: [],
};
const blogSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogsAsync.fulfilled, (state, action) => {
        state.blogs = action.payload.data.data;
        state.isLoading = false;
      })
      .addCase(fetchBlogsAsync.rejected, (state, action) => {
        state.blogs = [];
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyBlogsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyBlogsAsync.fulfilled, (state, action) => {
        state.myBlogs = action.payload.data.data;
        state.isLoading = false;
      })
      .addCase(fetchMyBlogsAsync.rejected, (state, action) => {
        state.myBlogs = [];
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCommentsAsync.fulfilled, (state, action) => {
        state.comment = action.payload.data.data;
      })
      .addCase(fetchBlogsByIdAsync.fulfilled, (state, action) => {
        state.currentBlog = action.payload.data.data;
      });
  },
});

export const { setCurrentBlog } = blogSlice.actions;

export const blogReducer = blogSlice.reducer;
