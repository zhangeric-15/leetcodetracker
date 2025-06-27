const User  = require("../models/userModel")
const jwt = require('jsonwebtoken')

// paylod will be the user's _id property
function generateToken(payload) {
    const secretKey = process.env.JWT_SECRET_KEY;
    // set expiration date on token
    const options = {expiresIn: '1d'}
    return jwt.sign({userId: payload}, secretKey, options);
}


async function signupUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password);
        // Create JWT token
        const jwtToken = generateToken(user._id);
        res.cookie('jwt-token', jwtToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/' // Tells browser to send the cookie on ALL PATHS
        });
        // TODO: Since we are utilizing cookies, may not need to return the JWT in the res body anymore?
        return res.status(200).json({email, token: jwtToken})
    } catch(error) {
        console.log("Error signing up user: ", error.message)
        return res.status(400).json({error: error.message})
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const jwtToken = generateToken(user._id);
        res.cookie('jwt-token', jwtToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/' // Tells browser to send the cookie on ALL PATHS

        });
        // TODO: Since we are utilizing cookies, may not need to return the JWT in the res body anymore?
        return res.status(200).json({email, token: jwtToken});
    } catch(error) {
        console.log("Error logging in user: ", error.message);
        return res.status(401).json({error: error.message});
    }
}

module.exports = {
    signupUser,
    loginUser
};