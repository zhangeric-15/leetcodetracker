const Topic = require('../models/topicModel');

async function addTopic(req, res) {
    const { topicName, color } = req.body;
    if (!topicName || !color) {
        return res.status(400).json({error: 'topicName and color fields are REQUIRED'});
    }
    // REMEMBER: user is a new field to the req object that was added through the middleware requireAuth.js
    const user = req.user;
    try {
        const topic = await Topic.create({user, topicName, color});
        return res.status(200).json({topic})
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    addTopic
};