const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    // IMPORTANT: user field is referencing the OBJECTID (_id field automatically created by MongoDB) of the User object defined in userModel.js.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    },
    problemName: {
        type: String,
        required: true
    },
    url: String,
    difficulty: {
        type: String,
        enum: ['EASY', 'MEDIUM', 'HARD', 'UNKNOWN'],
        default: 'UNKNOWN'
    },
    understanding: {
        type: String,
        enum: ['UNDERSTAND', 'MEDIUM', 'NEEDS_REVIEW'],
        required: true
    },
    // Referencing the Topic's _id here. topics will contain a list of Topic objects defined in topicModel.js.
    topics: [{type: mongoose.Schema.Types.ObjectId, ref: 'Topic'}]   
});

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;