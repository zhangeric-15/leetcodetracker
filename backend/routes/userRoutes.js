const express = require('express');
const { signup } = require('../controllers/userController');

const router = express.Router();

router.post('/api/users/signup', signup);