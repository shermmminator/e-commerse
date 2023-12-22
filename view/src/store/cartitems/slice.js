import { getCartItems,  deleteCartItem } from "../../api/cartItems";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCartItems = createAsyncThunk(
    "cart/items",
    async(params, thunkAPI) => {
        try {
            const result = await getCartItems(params);

            if(!result) {
                return {
                    loadError: true,
                    isLoading: false,
                    cartItems: []
                }
            }

            return {
                loadError: false,
                isLoading: false,
                cartItems: result
            }

        } catch(e) {
            console.log(e.message);
            console.log("Error in the fetchCartItems thunk");
            throw e
        }
    }
)

export const removeCartItem = createAsyncThunk(
    "cart/items/remove",
    async(params, thunkAPI) => {
        try {  
            const result = await deleteCartItem(params);

            return {
                cartItemId: params
            }

        } catch(e) {
            console.log(e.message);
            console.log("Error in the removeCartItem function");
        }
    }
)


const cartItemsSlice = createSlice({
    name: "carItems",
    initialState: {
        loadError: false,
        isLoading: false,
        cartItems: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCartItems.fulfilled, (state, action) => {
            const { loadError, isLoading, cartItems } = action.payload;
            state.loadError = loadError;
            state.isLoading = isLoading;
            Object.assign(state, {cartItems: cartItems});

        })
        .addCase(fetchCartItems.rejected, (state, action) => {
            state.loadError = true;
            state.isLoading = false;
        })
        .addCase(removeCartItem.fulfilled, (state, action) => {
            const { cartItemId } = state.action
            state.loadError = false;
            state.isLoading = false;
            state.cartItems = state.cartItems.filter(item => item.cartItemId !== cartItemId);
        })
    }
});

export default cartItemsSlice.reducer;