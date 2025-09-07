const jwt = require('jsonwebtoken')

/* 
    IMPORTANT Intro information - for utilizing LOCAL STORAGE:
    When sending a fetch request from the FRONT-END, the request object that gets passed in is in the format of..

    const response = await fetch('/api/protected', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ someData: 'value' })
    });
*/



// SOON TO BE DEPRECATED
// VERIFY JWT which is stored as an Authorization Bearer token in the req.headers.
function authJwtBearer(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        console.log("Missing Authentication Bearer token - JWT");
        return res.status(401).json({error: "Missing Authentication Bearer Token - JWT"});
    }
    const token = authorization.split(" ")[1]
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!userId) {
            throw Error("JWT verified, but unable to grab userId");
        }
        req.user = userId;
    } catch(error) {
        console.log("Error verifying signature of JWT");
        return res.status(401).json({error})
    }
    next();
}

function authJwtCookie(req, res, next) {
    const jwtToken = req.cookies.jwtToken;
    // Cookie is expired or missing
    if (!jwtToken) {
        return res.status(401).json({error: "Cookies have expired or are missing!"});
    }
    try {
        // We will get the decoded payload here, which will be the userId
        const { userId } = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        if (!userId) {
            throw Error("Unable to verify JWT");
        }
        req.user = userId;
    } catch(error) {
        console.log("Error verifying signature of JWT");
        return res.status(401).json({error: "Error verifying signature of JWT"})
    }
    next();
}

module.exports = {
    authJwtBearer,
    authJwtCookie
};