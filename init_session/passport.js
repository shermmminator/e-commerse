const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUserByEmail, loginUser, getUserById } = require("../db_quiries/user");
const { comparePass } = require("../helpers/hashedPass");

module.exports = (app) => {

        app.use(passport.initialize());
        app.use(passport.session());
        
        passport.serializeUser((user, done) => {
            console.log("serializing user");
            done(null, user.id)
        });

        passport.deserializeUser((id, done) => {
            try {
                console.log("deserializing user");
                done(null, { id });
            } catch(e) {
                console.log(e.message);
                console.log("Problem with the passport.deserializeUser function");
            }
        });

        passport.use(new LocalStrategy(
            async (username, password, done) => {

                try {
                
                    const user = await loginUser({ email: username, password });

                    return done(null, user)

                } catch(e) {
                    return done(e)
                }
            }
        ))

        console.log("Passport object has been created");
        return passport

    
};
