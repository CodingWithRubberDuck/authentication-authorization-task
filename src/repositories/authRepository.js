const users = require('../data/users');

async function saveNewUser(user){
    if (users.some(u => u.username === user.username)) {
        return false;
    }
    users.push(user);
    return true;
}

async function findUserByUsername(username){
    return users.find(u => u.username === username);
}

async function updateUsernameById(id, username){
    const user = users.find(u => u.id === id);
    if (!user) {
        return null;
    }
    if (users.some(u => u.id !== id && u.username === username)) {
        return false;
    }
    user.username = username;
    return true;
}

module.exports = {saveNewUser, findUserByUsername, updateUsernameById}