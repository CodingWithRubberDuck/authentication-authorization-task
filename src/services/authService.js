const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('node:crypto');
const AppError = require('../utils/AppError')
const { tokenExpiresIn } = require('../utils/authCookie');

const authRepository = require('../repositories/authRepository')
const getJwtSecret = require('../utils/getJwtSecret');

function validateUsername(username){
    if (typeof username !== 'string' || username.trim().length === 0) {
        throw new AppError('Username must be a non-empty string', 400);
    }
    return username.trim();
}

async function handleRegister({username, password}){
    username = validateUsername(username);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: randomUUID(), username, password: hashedPassword}
    const saved = await authRepository.saveNewUser(user);
    if (!saved) {
        throw new AppError('Username is already registered', 409);
    }
}

async function handleLogin({username, password}){
    const user = await authRepository.findUserByUsername(username);
    if (!user){
        throw new AppError('Invalid username or password', 401)
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword){
        throw new AppError('Invalid username or password', 401)
    }
    return jwt.sign({}, getJwtSecret(), {
        subject: user.id,
        expiresIn: tokenExpiresIn,
        algorithm: 'HS256'
    });

}

async function handleUsernameChange(userId, requestedUsername){
    const username = validateUsername(requestedUsername);
    const updated = await authRepository.updateUsernameById(userId, username);
    if (updated === null) {
        throw new AppError('User not found', 404);
    }
    if (!updated) {
        throw new AppError('Username is already registered', 409);
    }
    return { username };
}

module.exports = {handleRegister, handleLogin, handleUsernameChange}