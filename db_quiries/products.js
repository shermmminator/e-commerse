const db = require("../db_connect");

const getAllProduct = async() => {

    try {

        const statement = `SELECT * FROM products`;

        const result = await db.query(statement);

        if(result.rows.length > 0) {
            return result.rows;
        }

        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in the getAllProduct function");
    }
};

const getSpecificProduct = async(id) => {

    try {
        const statement = `SELECT * FROM products WHERE id = $1`;

        const values = [id];

        const result = await db.query(statement, values);

        if(result.rows.length > 0) {
            return result.rows

        }

        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in getSpecificProduct");
    }
}



module.exports = {
    getAllProduct,
    getSpecificProduct
};