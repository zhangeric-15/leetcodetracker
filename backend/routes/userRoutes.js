const express = require('express');
const { signupUser, loginUser } = require('../controllers/userController');

console.log("userRoutes module has run");

const userRouter = express.Router();

userRouter.post('/signup', signupUser);

userRouter.post('/login', loginUser);

// TODO: Create a /logout route to clear the JWT cookies when the user logs out.
// Remember: Front end can not access httpOnly Cookies!

module.exports = userRouter