const authService = require('../services/authService');
const { cookieName, cookieOptions, tokenMaxAge } = require('../utils/authCookie');

async function register(req, res){
    await authService.handleRegister(req.body);
    res.status(201).json({ message: 'User registered successfully' })
}

async function login(req, res){
    const token = await authService.handleLogin(req.body);
    res.cookie(cookieName, token, {
        ...cookieOptions,
        maxAge: tokenMaxAge
    });
    res.json({ message: 'Logged in successfully' });
}

function logout(_req, res){
    res.clearCookie(cookieName, cookieOptions);
    res.json({ message: 'Logged out successfully' });
}

async function changeUsername(req, res){
    // req.user.id is the one from the cookie which was assigned as part of the middleware authMiddleware

    // NOTICE - we do not allow an id to be written by the user, only supplied by the cookie.
    //          Therefore we do not check the id, we simply use the one supplied by the cookie.
    //          In the cookie we trust!!!
    const user = await authService.handleUsernameChange(req.user.id, req.body?.username);
    res.json({ message: 'Username updated successfully', user });
}

module.exports = {register, login, logout, changeUsername}
