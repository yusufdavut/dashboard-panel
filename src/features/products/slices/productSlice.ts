import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Product } from "../types";
import axiosInstance from "../../../shared/utils/axios";

interface ProductState {
  products: Product[];
  favorites: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  favorites: [],
  loading: false,
  error: null,
};

// Async thunk ile ürünleri çekiyoruz
export const fetchProducts = createAsyncThunk<Product[]>(
  "product/fetchProducts",
  async () => {
    const response = await axiosInstance.get("products.json");
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    toggleFavorite(state, action: PayloadAction<Product>) {
      const exists = state.favorites.find((f) => f.id === action.payload.id);
      if (exists) {
        state.favorites = state.favorites.filter(
          (f) => f.id !== action.payload.id
        );
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Ürünler yüklenemedi";
    });
  },
});

export const { addProduct, updateProduct, deleteProduct, toggleFavorite } =
  productSlice.actions;
export default productSlice.reducer;
