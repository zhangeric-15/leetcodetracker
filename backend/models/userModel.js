const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("Login - Email or Password is missing!");
    }
    // IMPORTANT: We grab the user's email and HASHED PASSWORD. Will compare typed password to the HASHED PASSWORD by using bcrypt.compare
    // Even though this is a static method, we can still use 'this' because 'this' refers to the MODEL itself, not an INSTANCE of the model.
    const existingUser = await this.findOne({email});
    if (!existingUser) {
        throw Error(`User with email: ${email} does NOT exist`);
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
        throw Error("Incorrect Email or Password!");
    }
    return existingUser;
}

userSchema.statics.signup = async function(email, password) {
    if (!email || !password) {
        throw Error("Signup - Email or Password is missing!");
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