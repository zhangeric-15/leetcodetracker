const express = require('express');
const {authJwtBearer, authJwtCookie} = require('../middleware/requireAuth');
const { addTopic, getAllTopics } = require('../controllers/topicController');

const topicRouter = express.Router();
//topicRouter.use(authJwtBearer);
topicRouter.use(authJwtCookie);

topicRouter.post('/addTopic', addTopic)
topicRouter.get('/getAllTopics', getAllTopics);

module.exports = topicRouter;