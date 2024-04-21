import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../api/auth";

export const userLoginAsync = createAsyncThunk(
  "loginUser",
  async ({ email, password }) => {
    console.log(email, password);
    const data = await loginUser(email, password);
    const token = data.token;
    localStorage.setItem("token", token); // Store token in local storage
    const user = data.user;
    return user;
  }
);
const initialState = {
  isUserAuthenticated: false,
  user: null,
  error: null,
  isLoading: false,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUserAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const authReducer = authSlice.reducer;
