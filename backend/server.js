const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const problemRouter = require('./routes/problemRoutes');
const topicRouter = require('./routes/topicRoutes');
require('dotenv').config();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();


// Additional Middleware we need for the server.
// Allow requests from your frontend origin
app.use(cors({
    origin: 'http://localhost:5173', // or use "*" to allow all (not recommended in prod)
    credentials: true
  }));
app.use(express.json());

// IMPORTANT INFO:
// When browser sends a request, the cookie header of the req object is just a plain string like this: 'token=eyJhbGciOi...; anotherCookie=abc123;' 
// Each cookie is separated by a ';'
// What cookieParser does is its a middleware that takes the header and parses it into a Javascript object:
                                    // req.cookies = {
                                    //     token: 'eyJhbGciOi...',
                                    //     anotherCookie: 'abc123'
                                    //   };
app.use(cookieParser());


app.use('/api/users', userRouter);
app.use('/api/problems', problemRouter);
app.use('/api/topics', topicRouter);

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