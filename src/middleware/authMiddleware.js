const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const getJwtSecret = require('../utils/getJwtSecret');
const { cookieName } = require('../utils/authCookie');

function authMiddleware(req, _res, next) {
    const token = req.cookies && req.cookies[cookieName];
    if (!token) {
        return next(new AppError('Authentication token required', 401));
    }

    const secret = getJwtSecret();
    try {
        const payload = jwt.verify(token, secret, { algorithms: ['HS256'] });
        if (!payload || typeof payload !== 'object' || typeof payload.sub !== 'string') {
            return next(new AppError('Invalid authentication token', 401));
        }

        req.user = { id: payload.sub };
        return next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(new AppError('Invalid or expired authentication token', 401));
        }
        return next(error);
    }
}

module.exports = authMiddleware;