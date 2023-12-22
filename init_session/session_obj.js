const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

module.exports = (app) => {
    try {
        app.use(cors({
            origin: ["http://localhost:3000", "https://GadgetDron-fullstack.onrender.com"],
            credentials: true
        }));

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.set('trust proxy', 1);

        app.use(
            session({
                secret: "sUper$ecure",
                saveUninitialized: false,
                resave: false,
                cookie: {
                    maxAge: 24 * 60 * 60 * 1000,
                    secure: false
                    // Add optional secure headers for Cross-request attack prevention
                }
            })
        );

        // console.log("Session object has been created");

        return app

    } catch(e) {
        console.log(e.message);

    }

};