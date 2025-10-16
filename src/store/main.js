import { configureStore } from "@reduxjs/toolkit";
import contentsReducer from "../feature/contentSlice"; 

const store = configureStore({
  reducer: {
    contents: contentsReducer,
  },
});

export default store;