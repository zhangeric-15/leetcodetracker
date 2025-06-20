const express = require('express');
const requireAuthMiddleware = require('../middleware/requireAuth');
const { addTopic, getAllTopics } = require('../controllers/topicController');

const topicRouter = express.Router();
topicRouter.use(requireAuthMiddleware);

topicRouter.post('/addTopic', addTopic)
topicRouter.get('/getAllTopics', getAllTopics);

module.exports = topicRouter;