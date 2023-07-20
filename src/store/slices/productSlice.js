import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  loading: false,
  error: false,
};

export const fetchAllData = createAsyncThunk(
  "product/fetchAllData",
  async (payload) => {
    try {
      let url = `http://localhost:4000/api/product?APIKey=${process.env.REACT_APP_API_KEY}`;
      if (payload) {
        url = `${url}&category=${payload}`;
      }
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      return err;
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default productSlice.reducer;
