const express = require('express');
const {authJwtBearer, authJwtCookie} = require('../middleware/requireAuth');
const { getAllProblems, addProblem, deleteProblem, editProblem } = require('../controllers/problemsController');

const problemRouter = express.Router();

// Authentication Middleware
//problemRouter.use(authJwtBearer);
problemRouter.use(authJwtCookie);

problemRouter.get('/getAllProblems', getAllProblems);
problemRouter.post('/addProblem', addProblem);
problemRouter.delete('/:problemId', deleteProblem)
problemRouter.patch('/:problemId', editProblem);

module.exports = problemRouter;