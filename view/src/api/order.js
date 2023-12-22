import API from "./client"

export const placeOrder = async(data) => {
    try {
        const response = await API.post(`cart/mine/checkout`, data);

        return response.data

    } catch(e) {
        console.log("Error in the placeOrder function");
        console.log(e.message);
    }
};

export const getOrderItems = async(userId) => {
    try {
        const response = await API.get(`orders/${userId}`);

        return response.data

    } catch(e) {
        console.log(e.message);
        console.log("Error in the getOrderItems function");
    }
}