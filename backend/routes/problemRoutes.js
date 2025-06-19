const express = require('express');
const requireAuthMiddleware = require('../middleware/requireAuth');
const { getAllProblems } = require('../controllers/problemsController');

const problemRouter = express.Router();

// Authentication Middleware
problemRouter.use(requireAuthMiddleware);

problemRouter.get('/getAllProblems', getAllProblems);

module.exports = problemRouter;