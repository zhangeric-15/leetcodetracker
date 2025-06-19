const express = require('express');
const requireAuthMiddleware = require('../middleware/requireAuth');
const { addTopic } = require('../controllers/topicController');

const topicRouter = express.Router();
topicRouter.use(requireAuthMiddleware);

topicRouter.post('/addTopic', addTopic)

module.exports = topicRouter;