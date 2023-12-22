import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, getSpecificProduct } from "../../api/products";

export const fetchProducts = createAsyncThunk(
    "products/getProducts",
    async(params, thunkAPI) => {
        try {
            const result = await getProducts(); 

            if(!result) {
                throw new Error
            }

            return {
                products: result
            };

        } catch(e) {
            console.log("Error in the fetchProducts async thunk");
            console.log(e.message);
            throw e
        }     

    }
);

export const fetchProduct = createAsyncThunk(
    "products/getProduct",
    async(params, thunkAPI) => {
        try {
            const result = await getSpecificProduct(params);

            if(!result) {
                throw new Error
            }

            return {
                product: result
            }

        } catch(e) {
            console.log("Error in the fetchProducts async thunk");
            console.log(e.message);
            throw e
        }
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        isLoading: false,
        loadError: false,
        productsAreLoaded: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.fulfilled, (state, action) => {
            const { products } = action.payload;
            Object.assign(state, { products: products });
            state.loadError = false;
            state.productsAreLoaded = true;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loadError = true;
            state.productsAreLoaded = false;
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
            const { product } = action.payload;
            Object.assign(state, { products: product });
            state.loadError = false;
            state.productsAreLoaded = true;
        })
        .addCase(fetchProduct.rejected, (state, action) => {
            state.loadError = true;
            state.productsAreLoaded = false;
        })
    }

});

export default productsSlice.reducer;