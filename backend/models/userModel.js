const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    }, 
    password: {
        type: String,
        require: true
    }
});

userSchema.statics.signup = async function(email, password) {
    if (!email || !password) {
        throw Error("Email or Password is missing!")
    }
}

const User = mongoose.model();
module.exports = User;