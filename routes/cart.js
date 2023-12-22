const express = require("express");
const router = express.Router();
const { addCart, addCartItem, updateCartItem, deleteCartItem, getCartItemsById } = require("../db_quiries/cart");
const cartCheckout = require("../helpers/cartCheckout");

module.exports = (app) => {

    app.use("/api/cart", router);
    
    router.get("/mine", async(req, res, next) => {
        try {
            //Normally you could extract user from req.user object like const { id } = req.user, but here it is done by sending the id in the body object
            const { id } = req.user; 
            const result = await addCart(id);
            
            if(result) {
                res.status(201).send(result);
                
            } else {
                res.status(400).send("Cart could not be added");
            }
            
        } catch(e) {
            //console.log(e.message);
            next(e)
            
        }
    });

    router.get("/items/:userId", async(req, res, next) => {
        try {
            //Normally you could extract user from req.user object like const { id } = req.user, but here it is done by sending the id in the body object
            const { userId } = req.params;
            const result = await getCartItemsById(userId);

            if(result) {
                res.status(200).send(result);

            } else {
                res.status(400).send("Operation not successful");
            }

        } catch(e) {
            next(e)
        }
    });

    router.post("/mine/items", async(req, res, next) => {
        try {
            //Extract id from req.user object once view is implement, this will be req.body.id this time
            const { id, data } = req.body;
            const result = await addCartItem(id, data);

            if(result) {
                res.status(200).send(result);

            } else {
                res.status(400).send("Product could not be inserted");
            }

        } catch(e) {
            next(e)
        }
    });

    router.put("/mine/items/:cartItemId", async(req, res, next) => {
        try {
            const { cartItemId } = req.params;
            const { qty } = req.body;

            const result = await updateCartItem(cartItemId, qty);

            if(result) {
                res.status(201).send(result);

            } else {
                res.status(400).send("Update operation not successful");
            }

        } catch(e) {
            next(e)
        }
    });

    router.delete("/mine/items/:cartItemId", async(req, res, next) => {
        try {
            const { cartItemId } = req.params;
            const result = await deleteCartItem(cartItemId);

            if(result) {
                res.status(200).send(result)

            } else {
                res.status(400).send("Delete operation not successful");
            }

        } catch(e) {
            next(e)
        }

    });

    router.post("/mine/checkout", async(req, res, next) => {
        try {
            // const { id, cart_id, paymentInfo } = req.body;
            const response = await cartCheckout(req.body);

            if(response) {
                res.status(200).send(response);

            } else {
                res.status(400).send("Operation could be completed");
            }

        } catch(e) {
            //console.log(e.message);
            next(e)

        }
    });
};