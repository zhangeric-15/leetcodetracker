const express = require('express');
const {authJwtBearer, authJwtCookie} = require('../middleware/requireAuth');
const { addTopic, getAllTopics, deleteTopic, updateTopicColor } = require('../controllers/topicController');

const topicRouter = express.Router();
//topicRouter.use(authJwtBearer);
topicRouter.use(authJwtCookie);

topicRouter.post('/', addTopic)
topicRouter.get('/', getAllTopics);
topicRouter.delete('/:topicId', deleteTopic)
topicRouter.patch('/:topicId', updateTopicColor)

module.exports = topicRouter;