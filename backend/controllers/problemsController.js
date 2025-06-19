const Problem = require('../models/problemModel');

function getAllProblems(req, res) {
    return res.status(200).json({success: "success"});
}

module.exports = {
    getAllProblems
};