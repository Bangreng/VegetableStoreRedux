import { createAsyncThunk } from "@reduxjs/toolkit";
import ky from "ky";
import type { Product } from "../../types/Product";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await ky
        .get("https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json")
        .json<Product[]>();

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);