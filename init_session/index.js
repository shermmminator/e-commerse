const routerLoader = require("../routes");
const createSession = require("./session_obj");
const createPassport = require("./passport");

module.exports = async(app) => {

    const app_adv = await createSession(app);

    const passport = await createPassport(app_adv);

    await routerLoader(app_adv, passport);

    app.use((err, req, res, next) => {

        const { message, status } = err;
        console.log(message);
      
        return res.status(400).send({ message });
      });

}