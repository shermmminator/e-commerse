import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./user/slice";
import productsReducer from "./products/slice";
import cartItemsReducer from "./cartitems/slice";
import ordersReducer from "./orders/slice";


// Store configuration
export default configureStore({
    reducer: combineReducers({
        users: usersReducer,
        products: productsReducer,
        cartItems: cartItemsReducer,
        orders: ordersReducer
    })
});
