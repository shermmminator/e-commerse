import API from "./client";

export const getCartItems = async(userId) => {
    try {
        const response = await API.get(`cart/items/${userId}`);

        return response.data

    } catch(e) {
        console.log(e.message);
        console.log("error in the getCartItems function");
    }
};

export const insertCartItem = async(data) => {
    try {
        const response = await API.post(`cart/mine/items`, data);

        return response.data

    } catch(e) {
        console.log("Error in the insertCartItem function");
        console.log(e.message);
    }
}

export const deleteCartItem = async(cartItemId) => {
    try {
        const response = API.delete(`cart/mine/items/${cartItemId}`);

        return response.data

    } catch(e) {
        console.log("Error in the deleteCartItem api call");
        console.log(e.message);
    }
}

export const modifyQuantity = async(cartItemId, data) => {
    try {
        const response = API.put(`cart/mine/items/${cartItemId}`, data);

        return response.data

    } catch(e) {
        console.log("Error in the modifyQuantity function");
        console.log(e.message);
    }
}