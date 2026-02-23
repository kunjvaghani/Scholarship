const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.headers['x-auth-token']) {
        token = req.headers['x-auth-token'];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from the token (and attach to request object)
        req.user = await User.findById(decoded.user.id).select('-password');

        next();
    } catch (error) {
        console.error('Token Error:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};






