const express = require('express');
const { signupUser, loginUser, getCurrentUser, logoutUser } = require('../controllers/userController');
const { authJwtCookie } = require('../middleware/requireAuth');

console.log("userRoutes module has run");

const userRouter = express.Router();

userRouter.post('/signup', signupUser);

userRouter.post('/login', loginUser);

// IMPORTANT: We are checking if a user is logged in, so we need the authentication middleware here.
userRouter.get('/currentUser', authJwtCookie, getCurrentUser);

// Remember: Front end can not access httpOnly Cookies!
userRouter.post('/logout', logoutUser);

module.exports = userRouter