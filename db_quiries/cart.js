const db = require("../db_connect");
const moment = require("moment");

const getCartById = async(userId) => {
    try {
        const statement = `SELECT * FROM cart WHERE user_id = $1`;
        const values = [userId];

        const result = await db.query(statement, values);

        if(result.rows.length > 0) {
            return result.rows[0];
        }

        return false;

    } catch(e) {
        console.log("Error in the getCartById function, because of:");
        console.log(e.message);
    }
};

const getCartItemsById = async(userId) => {
    try {
        // console.log(userId);
        const statement =  `SELECT products.name, products.price, cart_item.qty, cart_item.id AS "cartItemId", products.id AS "productId"
                            FROM cart
                            INNER JOIN cart_item
                            ON cart.id = cart_item.cart_id
                            JOIN products
                            ON cart_item.product_id = products.id
                            WHERE cart.user_id = $1`;
        
        const values = [userId];

        const result = await db.query(statement, values);

        if(result.rows.length > 0) {
            return result.rows
        }

        return false


    } catch(e) {
        console.log(e.message);
        console.log("Error in the getCartItemsById");
    }
};

const getCartItemsByCartId = async(cartId) => {
    try {
        const statement =  `SELECT cart_item.id, products.name, products.price, cart_item.qty
                            FROM cart
                            INNER JOIN cart_item
                            ON cart.id = cart_item.cart_id
                            INNER JOIN products
                            ON cart_item.product_id = products.id
                            WHERE cart.id = $1`;
        
        const values = [cartId];

        const result = await db.query(statement, values);

        if(result.rows.length > 0) {
            return result.rows
        }

        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in the getCartItemsByCartId");
    }
};

const verifyIfExists = async(cartId, productId) => {
    try {
        const statement = `SELECT * FROM cart_item WHERE cart_id = $1 AND product_id = $2`;

        const values = [cartId, productId];

        const result = await db.query(statement, values);

        if(result.rows.length > 0) {
            return true
        }

        return false

    } catch(e) {
        console.log("Error in the verifyIfExists function");
        console.log(e.message);

    }
};

const addCartItem = async(userId, data) => {
    try { 
        const cart = await getCartById(userId);

        if(!cart) {
            console.log("The user with that id has no carts");
            return false
        }
        
        const alreadyAdded = await verifyIfExists(cart.id, data.id); 
        console.log(alreadyAdded);

        if(alreadyAdded) {
            const statement2 = `UPDATE cart_item
                                SET qty = qty + $1
                                WHERE cart_id = $2
                                AND product_id = $3
                                RETURNING *
                                `;

            const values2 = [data.qty, cart.id, data.id];
            const result2 = await db.query(statement2, values2);

            if(result2.rows.length > 0) {
                return result2.rows[0];
            }

            return false
         }

        const statement = `INSERT INTO cart_item (cart_id, product_id, qty) VALUES ($1, $2, $3) RETURNING *`;

        const values = [cart.id, data.id, data.qty];

        const result = await db.query(statement, values);

        if(result.rows.length > 0) {
            return result.rows[0]
        }
        console.log("Insert statement not possible");
        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in the addCartItem function");
    }
};

const updateCartItem = async(cartItemId, qty) => {
    try {
        const statement = `UPDATE cart_item SET qty = $1 WHERE id = $2 RETURNING *`;

        const values = [qty, cartItemId];

        const result = await db.query(statement, values);

        if(result.rows.length > 0) {
            return result.rows[0];
        }

        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in the updateCartItem function");

    }
};

const deleteCartItem = async(cartItemId) => {
    try {
        const statement = `DELETE from cart_item WHERE id = $1 RETURNING *`;

        values = [cartItemId];

        const result = await db.query(statement, values);

        if(result.rows.length > 0) {
            return result.rows[0]
        }

        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in the deleteCartItem function");
    }
};

const addCart = async(userId) => {
    try {
        const timeCreated = moment.utc().toISOString();
        const statement = `INSERT INTO cart (user_id, created) VALUES ($1, $2) RETURNING *`;
        const values = [userId, timeCreated];
        const result = await db.query(statement, values);

        if(result.rows.length > 0) {
            return result.rows[0];
        }

        return false

        } catch(e) {
            console.log(e.message);
            console.log("Error in the addCart function");
        }
};

const clearCartItems = async(cartId) => {
    try {
        const statement = `DELETE from cart_item WHERE cart_id = $1 RETURNING *`;
        const values = [cartId];
        
        const result = await db.query(statement, values);

        if(result !== undefined) {
            return true
        }

        return false

    } catch(e) {
        console.log("Error in the clearCartItems function");
        console.log(e.message);
    }
}

module.exports = {
    addCart,
    addCartItem,
    clearCartItems,
    updateCartItem,
    deleteCartItem,
    getCartById,
    getCartItemsById,
    getCartItemsByCartId
};