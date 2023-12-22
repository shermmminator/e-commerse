const express = require("express");
const router = express.Router();
const { getEveryOrder, getOrderByUserId } = require("../db_quiries/order");

module.exports = async(app) => {

    app.use("/api/orders", router);

    router.get("/", async(req, res, next) => {
        try {
            // You want to make a query here with the user id req.user.id
            const result = await getEveryOrder();

            if(result) {
                res.status(200).send(result);

            } else {
                res.status(400).send("Query did not return any order");
            }

        } catch(e) {
            next(e)
        }
    });

    router.get("/:userId", async(req, res, next) => {
        try {
            const { userId } = req.params;
            const result = await getOrderByUserId(userId);

            if(result) {
                res.status(201).send(result);

            } else {
                res.status(400).send("Query did not return any order")
            }

        } catch(e) {
            next(e)

        }
    });
};