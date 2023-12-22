const db = require("../db_connect");
const moment = require("moment");

const getEveryOrder = async() => {
    try {
        const statement = `SELECT * FROM orders`;

        const result = await db.query(statement);

        //console.log(result.rows);

        if(result.rows.length > 0) {
            return result.rows

        }

        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in the getEveryOrder function");
    }
};

const getOrderByUserId = async(userId) => {
    try {
        const statement =  `SELECT orders.total, order_product.qty, order_product.price, order_product.name
                            FROM orders
                            INNER JOIN order_product
                            ON orders.id = order_product.order_id
                            WHERE userid = $1`;

        const values = [userId];

        const result = await db.query(statement, values);

        if(result.rows.length > 0) {
            return result.rows
        }

        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in the getOrderByUserId function");
    }
};

const createOrder = async(data) => {
    try {   
        const { userId, total, items } = data;
        const timeCreated = moment.utc().toISOString();

        const statement = `INSERT INTO orders (total, userid, created) VALUES ($1, $2, $3) RETURNING *`;
        const values = [total, userId, timeCreated];

        const result = await db.query(statement, values);

        const { id } = result.rows[0];

        for(let cartItem of items) {
            const tempStatement =  `INSERT INTO order_product (order_id, product_id, qty, price, name)
                                    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
                                    
            const tempValues = [id, cartItem.productId, cartItem.qty, cartItem.price, cartItem.name];

            const tempResult = await db.query(tempStatement, tempValues);
            
            if(tempResult.rows.length === 0) {
                return false
            }
        }

        if(result.rows.length > 0) {
            return result.rows[0]
        }

        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in the createOrder function");
    }
};

module.exports = {
    createOrder,
    getEveryOrder,
    getOrderByUserId
};