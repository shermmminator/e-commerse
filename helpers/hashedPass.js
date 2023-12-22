const bcrypt = require("bcrypt");

const hashPass = async(pass) => {
    // You want to use different number of hashrounds every time
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(pass, salt);

        return hashedPass

    } catch(e) {
        console.log(e.message);
        console.log("Error in the hashPass function");
    }

};

const comparePass = async(pass, hashedPass) => {
    try {
        const passwordMatch = await bcrypt.compare(pass, hashedPass);

        return passwordMatch

    } catch(e) {
        console.log(e.message);
        console.log("Error in the comparePass function");
    }

    return false
}

module.exports = {
    hashPass,
    comparePass
};