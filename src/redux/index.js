// store.js
import { configureStore } from "@reduxjs/toolkit";
import savedSlice from "./slices/saved-slice";

const store = configureStore({
  reducer: {
    saved: savedSlice,
  },
});

export default store;
