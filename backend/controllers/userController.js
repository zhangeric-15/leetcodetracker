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
        res.cookie('jwtToken', jwtToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/' // Tells browser to send the cookie on ALL PATHS
        });
        return res.status(200).json({email})
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
        res.cookie('jwtToken', jwtToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/' // Tells browser to send the cookie on ALL PATHS

        });
        return res.status(200).json({email});
    } catch(error) {
        console.log("Error logging in user: ", error.message);
        return res.status(401).json({error: error.message});
    }
}

// Purpose of this function is to utilize cookies stored in the browser and see if there is user currenty logged in.
async function getCurrentUser(req, res) {
    // This is the userId from MongoDB.
    const user  = req.user;
    const userDoc = await User.findOne({ _id: user });
    if (userDoc) {
        return res.status(200).json({ email: userDoc.email })
    } 
    return res.status(401).json({error: "No user is currently logged in"});
}

function logoutUser(req, res) {
    // options (2nd parameter) should match the cookie we sent when logging in and signing up.
    res.clearCookie('jwtToken', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: false
    });
    return res.status(200).json({message: "Successfully logged out and cleared cookies"});
}

module.exports = {
    signupUser,
    loginUser,
    getCurrentUser,
    logoutUser
};