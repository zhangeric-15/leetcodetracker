const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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
    const emailExists = await this.findOne({ email });
    if (emailExists) {
        throw Error("Email already exists!");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.create({email, password: hashedPassword});
    return user;
}

const User = mongoose.model('User', userSchema);
module.exports = User;