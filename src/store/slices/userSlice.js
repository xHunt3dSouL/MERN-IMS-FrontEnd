import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: false,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { getState }) => {
    try {
      const { token } = getState().auth; // Assuming the token is stored in the auth state
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:4000/api/user",
        config
      );
      return data;
    } catch (err) {
      throw err;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// Export the selectUser and selectIsAdmin functions directly
export const selectUser = (state) => state.user.user;
export const selectIsAdmin = (state) =>
  state.user.user && state.user.user.isAdmin;

export default userSlice.reducer;
