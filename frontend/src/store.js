import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./store/slice/authSlice";
import { blogReducer } from "./store/slice/blogSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogSlice: blogReducer,
  },
});

export default store;
