
import type { Product } from "../../types/Product";
import { fetchProducts } from './ProductThunks';
import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit'

export type CartItem = Product & { quantity: number };


interface ProductsState  {
    productList: Product[];
    isLoading: boolean;
    error: string;
    cart: CartItem[]
}

const initialState: ProductsState  = {
    productList: [],
    isLoading: false,
    error: '',
    cart: []
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToCart(state, action){
            const { product, quantity } = action.payload;
            const existing = state.cart.find(item => item.id === product.id);

            if (existing) {
                existing.quantity += quantity;
                if (existing.quantity <= 0) {
                    state.cart = state.cart.filter(item => item.id !== product.id);
                }
            } else {
                if (quantity > 0) {
                    state.cart.push({ ...product, quantity });
                }
            }
        },

        removeFromCart(state, action){
            state.cart = state.cart.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => { 
        builder
            .addCase(fetchProducts.pending, (state) => { 
                state.isLoading = true;
                state.error = '';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.isLoading = false;
                state.productList = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
        }
})

export const { addToCart, removeFromCart } = productSlice.actions;

export default productSlice.reducer;