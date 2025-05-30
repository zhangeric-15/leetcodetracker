const Test  = require("../models/userModel")


async function signupUser(req, res) {
    const { email, password } = req.body;
    const user = await Test.signup(email, password);
}

module.exports = {
    signupUser
};