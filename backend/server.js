require('dotenv').config()
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    console.log("GET request hit")
})

app.listen(process.env.PORT, () => {
    console.log("Leetcode Tracker backend started and listening on port:", process.env.PORT)
})