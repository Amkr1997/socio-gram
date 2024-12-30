import { configureStore } from "@reduxjs/toolkit";
import authorizeSlice from "./features/authorizeSlice";
import apiSlice from "./features/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authorize: authorizeSlice.reducer,
  },

  middleware: (prevMiddleware) => prevMiddleware().concat(apiSlice.middleware),
});

export default store;
