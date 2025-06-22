const Problem = require('../models/problemModel');
const Topic = require('../models/topicModel');

// Checks if the Topic in topics array match and belong to the logged in user. 
// This check prevents accessing a Topic that belongs to another user!
async function areTopicsValid(user, topics) {
    const topicsRetrieved = await Topic.find({
        _id: {$in: topics},
        user 
    });
    return topicsRetrieved.length === topics.length;
    
}

async function addProblem(req, res) {
    const { date, problemName, url, difficulty, understanding, topics } = req.body;
    const user = req.user;
    // We don't want to continue if there is no problemName. This is REQUIRED
    if (!problemName) {
        return res.status(400).json({error: "Missing problem name"});
    }
    // The ObjectIds provided in the topics array are NOT VALID
    const topicsValid = await areTopicsValid(user, topics);
    if (!topicsValid) {
        return res.status(400).json({error: "One or more topics do NOT belong to the logged in User"});
    }
    try { 
        const problem = await Problem.create({ user, date, problemName, url, difficulty, understanding, topics});
        return res.status(200).json(problem);
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }

}

function getAllProblems(req, res) {
    return res.status(200).json({success: "success"});
}

module.exports = {
    getAllProblems,
    addProblem
};