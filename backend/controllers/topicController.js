const Topic = require('../models/topicModel');

async function addTopic(req, res) {
    const { topicName, color } = req.body;
    if (!topicName || !color) {
        return res.status(400).json({error: 'topicName and color fields are REQUIRED'});
    }
    // REMEMBER: user is a new field to the req object that was added through the middleware requireAuth.js
    const userId = req.user;
    try {
        const topic = await Topic.create({user: userId, topicName, color});
        return res.status(200).json({topic})
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}

async function getAllTopics(req, res) {
    const userId = req.user;
    try {
        const topics = await Topic.find({ user: userId });
        return res.status(200).json(topics);
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    addTopic,
    getAllTopics
};