//Import paths here
const authRouter = require("./user");
const productRouter = require("./products");
const cartRouter = require("./cart");
const orderRouter = require("./orders");

module.exports = async(app, passport) => {
    //Begin calling the path functions here
    authRouter(app, passport);
    productRouter(app);
    cartRouter(app);
    orderRouter(app);
};