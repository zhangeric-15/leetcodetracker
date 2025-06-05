const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const problemRouter = require('./routes/problemRoutes')
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/problems', problemRouter);

mongoose.connect(process.env.MONGO_URI)
.then((response) => {
    console.log("SUCCESS - Connected to MongoDB database");
    app.listen(process.env.PORT, () => {
        console.log("Leetcode Tracker backend started and listening on port:", process.env.PORT);
    })
})
.catch(error => {
    console.log("Error starting MongoDB database with error: ", error);
})