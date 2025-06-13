const jwt = require('jsonwebtoken')

/* 
    IMPORTANT Intro information:
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


function requireAuthMiddleware(req, res, next) {
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

module.exports = requireAuthMiddleware;