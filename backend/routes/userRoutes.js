const express = require('express');
const { signupUser } = require('../controllers/userController');

console.log("userRoutes module has run");

const userRouter = express.Router();

userRouter.post('/signup', signupUser);

module.exports = userRouter