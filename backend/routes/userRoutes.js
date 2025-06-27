const express = require('express');
const { signupUser, loginUser, getCurrentUser } = require('../controllers/userController');
const { authJwtCookie } = require('../middleware/requireAuth');

console.log("userRoutes module has run");

const userRouter = express.Router();

userRouter.post('/signup', signupUser);

userRouter.post('/login', loginUser);

// IMPORTANT: We are checking if a user is logged in, so we need the authentication middleware here.
userRouter.get('/currentUser', authJwtCookie, getCurrentUser);

// TODO: Create a /logout route to clear the JWT cookies when the user logs out.
// Remember: Front end can not access httpOnly Cookies!

module.exports = userRouter