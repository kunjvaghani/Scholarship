const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header
    let token = req.header('x-auth-token');

    // Also check for Authorization: Bearer <token>
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
};