const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true 
    },
    topicName: {
        type: String,
        require: true
    },
    color: {
        type: String,
        enum: ['BLUE', 'GREEN', 'YELLOW', 'RED', 'PURPLE', 'BLACK', 'PINK']
    }
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;