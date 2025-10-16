
import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ----------------- Constants -----------------
const API_URL = "https://closet-recruiting-api.azurewebsites.net/api/data";
//const PAGE_SIZE = 20; // items per load for infinite scroll

// ----------------- Async fetch -----------------
export const fetchContents = createAsyncThunk(
  "contents/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const contentSlice = createSlice({
  name: "contents",
  initialState: {
    items: [], // full dataset
    status: "idle",
    error: null,
    // UI state (we store them in Redux so components can read/write; we still persist via URL)
    filters: {
      pricing: { paid: false, free: false, viewOnly: false },
      keyword: "",
      sortBy: "name", // optional
      priceRange: [0, 999],
    },
    page: 1,
  },
  reducers: {
    setPricing(state, action) {
      state.filters.pricing = { ...state.filters.pricing, ...action.payload };
      state.page = 1;
    },
    setKeyword(state, action) {
      state.filters.keyword = action.payload;
      state.page = 1;
    },
    setSortBy(state, action) {
      state.filters.sortBy = action.payload;
      state.page = 1;
    },
    setPriceRange(state, action) {
      state.filters.priceRange = action.payload;
      state.page = 1;
    },
    resetFilters(state) {
      state.filters = { pricing: { paid: false, free: false, viewOnly: false }, keyword: "", sortBy: "name", priceRange: [0, 999] };
      state.page = 1;
    },
    incrementPage(state) {
      state.page += 1;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const { setPricing, setKeyword, setSortBy, setPriceRange, resetFilters, incrementPage } = contentSlice.actions;
export default contentSlice.reducer;