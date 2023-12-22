const express = require("express");
const router = express.Router();
const { getAllProduct, getSpecificProduct } = require("../db_quiries/products");

module.exports = (app) => {

    app.use("/api/products", router);

    router.get("/", async(req, res, next) => {
        try {
            const result = await getAllProduct();

            if(result) {
                res.status(201).send(result);

            } else {
                res.status(400).send("No products available")
            }

        } catch(e) {
            next(e)
        }
    });

    router.get("/:id", async(req, res, next) => {
        try {
            const { id } = req.params;
            const result = await getSpecificProduct(id);

            if(result) {
                res.status(201).send(result);

            } else {
                res.status(401).send("No product was found with that id");
            }

        } catch(e) {
            next(e)
        }
    });
};