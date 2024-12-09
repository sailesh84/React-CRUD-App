import { configureStore } from "@reduxjs/toolkit";
import userDetails from "./slice/userDetailsSlice";

export const store = configureStore({
  reducer: {
    app: userDetails
  }
});