const db = require("../db_connect");
const { hashPass, comparePass } = require("../helpers/hashedPass");
const { addCart } = require("./cart");

const getEveryUser = async() => {
    try {
        const statement = `SELECT * FROM users`;

        const result = await db.query(statement);

        if(result.rows.length > 0) {
            return result.rows.map(user_obj => user_obj.email);
        }

        return false

    } catch(e) {
        console.log(e.message);
    }
};

const loginUser = async(data) => {
    try {
        const { email, password } = data;
        // console.log(data);
        const statement = `SELECT * FROM users WHERE email = $1`;

        const values = [email];

        const result = await db.query(statement, values);
        console.log(result.rows[0])

        if(!result.rows[0]) {
            throw new createError(401, "Password or email is incorrect");
        }

        const passwordsMatch = await comparePass(password, result.rows[0].password);

        if(!passwordsMatch) {
            throw new createError(401, "Password or email is incorrect");
        }

        return result.rows[0];

    } catch(e) {
        console.log(e.message);
        console.log("Error in the loginUser function")

    }
};

const editUser = async(id, data) => {
    try {
        const dataPool = [];

        for(let e in data) {

            if(data.hasOwnProperty(e) && data[e] !== null && data[e] !== undefined) {
                if(e === "password") {
                    data[e] = await hashPass(data[e]);
                }

                dataPool.push(`${e} = '${data[e]}'`);
            }
        }

        const queryParams = dataPool.join(", ");

        const statement = `UPDATE users SET ${queryParams} WHERE id = $1 RETURNING *`;

        const values = [id];

        const result = await db.query(statement, values);

        if(result.rows.length > 0) {
            return result.rows[0];
        }

        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in the editUser function");

    }
};

const getUserById = async(id) => {
    try {
        console.log(id);
        const statement =  `SELECT users.id, users.email, users.firstname, users.lastname, cart.id AS "cartId" 
                            FROM users 
                            INNER JOIN cart
                            ON users.id = cart.user_id
                            WHERE users.id = $1`;

        const values = [id];

        const result = await db.query(statement, values);

        if(result.rows.length > 0) {
            return result.rows[0];

        }

        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in the getUserById");

    }
};

const getUserByEmail = async(data) => {
    try {
        const { email } = data;
        const statement =  `SELECT * FROM users
                            WHERE email = $1`;

        const values = [email];
        
        const result = await db.query(statement, values);
        //console.log("length of user array in the getUserByEmail function"+result.rows.length);

        if(result.rows.length > 0) {   
            
            return result.rows[0]
        }

        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in the getUserByEmail function");

    }
};

const registerUser = async(data) => {
    try {
        const { email, password, firstName, lastName } = data;
        const statement = `INSERT INTO users (email, password, firstName, lastName) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [email, password, firstName, lastName];
        const result = await db.query(statement, values);
        
        const user = await getUserByEmail({ email: email });
        
        const result2 = await addCart(user.id);
       
        if(result2) {
            return result.rows[0]
        }

        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in the registerUser function");

    }
};

const checkIfEmailExists = async(email) => {
    try {
        const statement = `SELECT * FROM users WHERE email = $1`;

        const values = [email];

        const result = await db.query(statement, values);

        if(result.rows.length > 0) {
            return "Email already registered"
        }

        return false

    } catch(e) {
        console.log(e.message);
        console.log("Error in the checkIfEmailExists");
    }
};

module.exports = {
    loginUser,
    getUserByEmail,
    getUserById,
    registerUser,
    getEveryUser,
    editUser,
    checkIfEmailExists
};