import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userSlice,
  },
});
