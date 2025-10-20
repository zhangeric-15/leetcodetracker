const Problem = require('../models/problemModel');
const Topic = require('../models/topicModel');
const mongoose = require('mongoose')

// Find all topics that have their _id included in the topics array and belong to the LOGGED IN USER.
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
    // Check if the ObjectIds provided in the topics array BELONG to the logged in user.
    if (topics) {
        const topicsValid = await areTopicsValid(user, topics);
        if (!topicsValid) {
            return res.status(400).json({error: "One or more topics do NOT belong to the logged in User"});
        }
    }
    try { 
        const problem = await Problem.create({ user, date, problemName, url, difficulty, understanding, topics});
        // TODO: Potentially remove. May not need to populate 'topics' field
        // We need to refetch the problem recently added to populate the TOPIC field with its entire object (not just its ID).
        // const addedProblem = await Problem.findById(problem._id).populate('topics');
        return res.status(200).json(problem);
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }

}

async function getAllProblems(req, res) {
    const user = req.user;
    const sortOptions = {
        "date_asce" : {date: 1},
        "date_desc" : {date: -1}
    }
    // Grab the sort QUERY parameter from the URL
    // If there is no sort param, set default sorting to 'date_desc'
    const sort = req.query.sort || "date_desc";
    try {
        const problems = await Problem.find({user}).sort(sortOptions[sort]);
        return res.status(200).json(problems);
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}

async function deleteProblem(req, res) {
    const problemId = req.params.problemId;
    try {
        const deletedProblem = await Problem.findByIdAndDelete(problemId);
        if (deletedProblem) {
            return res.status(200).json(deletedProblem);
        } else {
            return res.status(404).json({error: `Problem with id ${problemId} not found. Can not delete.`})
        }

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

async function editProblem(req, res) {
    const user = req.user;
    const problemId = req.params.problemId;

    try {
        // Need to make sure ProblemId is in a valid format.
        if (!mongoose.Types.ObjectId.isValid(problemId)){
                return res.status(400).json({error: "Problem Update Error - Not a valid ID for problemId"});
        }
        // IMPORTANT CHECKS
        // 1. Check if Problem document belongs to the LOGGED IN user and has the matching problemId.
        const problem = await Problem.findOne({_id: problemId, user});
        if (!problem) {
            return res.status(404).json({error: "Problem not found or Problem is not owned by user."});
        }

        //TODO: Need to check if Topics provided by user are valid?
        const {topics: updatedTopics} = req.body;
        if (updatedTopics) {
            const topicsValid = await areTopicsValid(user, updatedTopics);
            if (!topicsValid) {
                return res.status(400).json({error: "One or more topics do NOT belong to the logged in User"});
            }
        }

        const updatedProblem = await Problem.findByIdAndUpdate(problemId, req.body, {new: true, runValidators: true});
        return res.status(200).json(updatedProblem);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }

}

module.exports = {
    getAllProblems,
    addProblem,
    deleteProblem,
    editProblem
};