const express = require('express');
const { signupUser, loginUser } = require('../controllers/userController');

console.log("userRoutes module has run");

const userRouter = express.Router();

userRouter.post('/signup', signupUser);

userRouter.post('/login', loginUser);

module.exports = userRouter