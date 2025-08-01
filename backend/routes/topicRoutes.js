const express = require('express');
const {authJwtBearer, authJwtCookie} = require('../middleware/requireAuth');
const { addTopic, getAllTopics, deleteTopic } = require('../controllers/topicController');

const topicRouter = express.Router();
//topicRouter.use(authJwtBearer);
topicRouter.use(authJwtCookie);

topicRouter.post('/addTopic', addTopic)
topicRouter.get('/getAllTopics', getAllTopics);
topicRouter.delete('/:topicId', deleteTopic)

module.exports = topicRouter;