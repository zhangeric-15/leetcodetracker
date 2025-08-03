const Topic = require('../models/topicModel');
const Problem = require('../models/problemModel')
const mongoose = require('mongoose')

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

// Remove the topic document with the specified topicId from the database, and update any Problem documents that still reference the deleted topic.
async function deleteTopic(req, res) {
    const topicId = req.params.topicId;
    // IMPORTANT CHECK - Make sure the topicId is valid and in the correct format
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
        return res.status(400).json({error: "Topic Deletion Error - Not a valid ID for topicId"});
    }
    try {
        const topicDeleted = await Topic.findByIdAndDelete(topicId);
        if (topicDeleted) {
            // Go through Problem collection, find Problem documents that has the DELETED topicId in its topics array and REMOVE it.
            await Problem.updateMany({topics: topicId}, {$pull: {topics: topicId}});
            return res.status(200).json({topicDeleted, msg: "Successfully deleted topic and updated any problem referencing deleted topic."});
        }
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    addTopic,
    getAllTopics,
    deleteTopic
};