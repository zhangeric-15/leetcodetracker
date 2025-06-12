const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const problemRouter = require('./routes/problemRoutes')
require('dotenv').config();

const cors = require('cors');
const app = express();

// Allow requests from your frontend origin
app.use(cors({
    origin: 'http://localhost:5173', // or use "*" to allow all (not recommended in prod)
    credentials: true
  }));
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