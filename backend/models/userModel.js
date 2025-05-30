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
        throw Error("Email or Password is missing!");
    }
    // check if email already exists
    const fetchedEmail = await this.find({ email });
    if (fetchedEmail) {
        throw Error("Email already exists!");
    }
    return null;

}

const User = mongoose.model('User', userSchema);
module.exports = User;