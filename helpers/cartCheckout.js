const { getCartItemsByCartId, getCartById, clearCartItems } = require("../db_quiries/cart");
const { createOrder } = require("../db_quiries/order");

module.exports = async(data) => {
    try {
        //console.log(data.cart_id);
        const { id, total, items, paymentInfo } = data;

        const cart = await getCartById(id);
        // const cartItems = await getCartItemsByCartId(cart_id);
        // console.log(cartItems);

        const result = await createOrder({
            userId: id,
            total: total,
            items
        });

        if(!result) {
            return false
        }

        const result2 = await clearCartItems(cart.id);

        if(!result2) {
            return false
        }

        return true
    
    } catch(e) {
        console.log(e.message);
        console.log("Problem in the cartCheckout function");
    }
};