const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true 
    },
    date: {
        type: Date,
        default: Date.now
    },
    problemName: {
        type: String,
        require: true
    },
    url: String,
    difficulty: {
        type: String,
        enum: ['EASY', 'MEDIUM', 'HARD', 'UNKNOWN'],
        require: true
    },
    understanding: {
        type: String,
        enum: ['UNDERSTAND', 'MEDIUM', 'NEEDS_REVIEW']
    },
    topics: {
        type: [String],
        require: true
    }
});

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;