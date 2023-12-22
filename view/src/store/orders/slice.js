import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrderItems } from "../../api/order";

export const loadOrderItems = createAsyncThunk(
    "order/orderItems",
    async(params, thunkAPI) => {
        try {   
            const result = await getOrderItems(params);

            if(!result) {
                return {
                    loadError: true,
                    isLoading: false,
                    items: []
                }
            }

            return {
                loadError: false,
                isLoading: false,
                items: result
            }

        } catch(e) {
            console.log("Error in  the loadOrderItems thunkAPi");
            console.log(e.message);
        }
    }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        loadError: false,
        isLoading: false,
        items: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loadOrderItems.fulfilled, (state, action) => {
            const { loadError, isLoading, items } = action.payload
            state.isLoading = isLoading;
            state.loadError = loadError;
            Object.assign(state, { items: items});
        })
        .addCase(loadOrderItems.rejected, (state, action) => {
            state.isLoading = false;
            state.loadError = true;
        })
    }
});

export default ordersSlice.reducer;