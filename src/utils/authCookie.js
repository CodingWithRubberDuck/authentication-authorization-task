const cookieName = 'token';
const tokenExpiresIn = '1h';
const tokenMaxAge = 60 * 60 * 1000;
const cookieOptions = {
    httpOnly: true,
    // Will only allow a cookie to be sent over "https",
    // but only if the env is set to 'production',
    // while not in production just "http" will be accepted.
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
};

module.exports = { cookieName, cookieOptions, tokenExpiresIn, tokenMaxAge };
