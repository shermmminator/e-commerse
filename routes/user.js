const express = require("express");
const { 
    registerUser, 
    getEveryUser,
    editUser, 
    getUserByEmail, 
    loginUser, 
    getUserById,
    checkIfEmailExists
} = require("../db_quiries/user");
const router = express.Router();
const { hashPass } = require("../helpers/hashedPass");

module.exports = async(app, passport) => {

    app.use("/api/auth", router);

    app.get("/users", async(req, res, next) => {
        try {
            const result = await getEveryUser();
            
            if(result) {
                res.status(200).send(result);

            } else {
                res.status(400).send("No users were in the db");
            }

        } catch(e) {

            //console.log(e.message);
            next(e)
        }
    });

    router.put("/changePass", async(req, res, next) => {
        try {
            const { id, password } = req.body;

            //const { email, password, firstName, lastName } = req.body;

            const result = await editUser(id, {password: password});

            if(result) {
                res.status(200).send("Password edited succeessfully");

            } else {
                res.status(400).send("Data could not be modified");
            }

        } catch(e) {
            next(e)
        }
    });

    router.get("/verify_login", async(req, res, next) => {
        try {
            const id = req.session.passport.user;
            // console.log("is user authenticated" + req.isAuthenticated());
            console.log(id);

            const user = await getUserById(id);

            if(user) {
                res.status(200).send(user);

            } else {
                res.status(400).send("Query was not successful");
            }
            
        } catch(e) {
            console.log(e.message);
            next(e)
        }
    });

    router.post("/login", passport.authenticate("local"), async(req, res, next) => {
        try {
            // console.log(req.session);
            // console.log(req.isAuthenticated());
            // req.session.isAuthenticated = true;
            // console.log(req.session);
            const { username } = req.body;
            const user = await getUserByEmail({ email: username });
            res.status(200).send(user);

        } catch(e) {
            next(e)
        }
    });

    router.post("/register", async(req, res, next) => {
        try {
            const { email, password, firstName, lastName } = req.body;

            const exists = await checkIfEmailExists(email);
            // console.log(exists)

            if(exists) {
                // console.log("Email already in use "+exists);
                return res.status(201).send(exists);
            }

            //Issue insert statement here
            const hashedPass = await hashPass(password);
            const result = await registerUser({
                email,
                password: hashedPass,
                firstName,
                lastName
            });

            if(result) {
                res.status(200).send(`User registration complete ${result}`);

            } else {
                res.status(400).send(`User could not be created`);
            } 
            

        } catch(e) {
            next(e)

        }
    });

    router.post("/logout", async(req, res, next) => {
        try {
            req.session.destroy(err => {
                if(err) {
                    console.log("Error destroying session", err);
                    return res.status(500).send(`There was an error loggin out the user`);
                }
            });

            res.send(`Logout successful`);
            
        } catch(e) {
            next(e)
        }
    })
};