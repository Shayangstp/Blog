import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  blogTitle: "",
  blogContent: "",
  formErrors: {},
};

const mainSlices = createSlice({
  name: "main",
  initialState,
  reducers: {
    RsetLoading: (state, { payload }) => {
      return { ...state, loading: payload };
    },
    RsetBlogTitle: (state, { payload }) => {
      return { ...state, blogTitle: payload };
    },
    RsetBlogContent: (state, { payload }) => {
      return { ...state, blogContent: payload };
    },
    RsetFormErrors: (state, { payload }) => {
      return { ...state, formErrors: payload };
    },
  },
});

export const { RsetLoading, RsetBlogTitle, RsetBlogContent, RsetFormErrors } = mainSlices.actions;

export const selectLoading = (state) => state.main.loading;
export const selectBlogContent = (state) => state.main.blogContent;
export const selectBlogTitle = (state) => state.main.blogTitle;
export const selectFormErrors = (state) => state.main.formErrors;

export default mainSlices.reducer;
