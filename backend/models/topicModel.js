const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    topicName: {
        type: String,
        required: true
    },
    color: {
        // Color will be stored as a Hexadecimal string - #RRGGBB
        type: String,
        // Remove ENUM for now.
        // enum: ['BLUE', 'GREEN', 'RED', 'PURPLE', 'BLACK', 'PINK', 'ORANGE']
    }
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;