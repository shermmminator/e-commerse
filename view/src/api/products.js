import API from "./client.js"

export const getProducts = async() => {
    try {
        const response = await API.get(`products`);
        return response.data
    
    } catch(e) {
        console.log(e.message);
        console.log("Error in the getProducts api call");

    }
};

export const getSpecificProduct = async(productId) => {
    try {
        const response = await API.get(`products/${productId}`);
        return response.data

    } catch(e) {
        console.log(e.message);
        console.log("Errorin the getSpecificProduct api call");
    }
}