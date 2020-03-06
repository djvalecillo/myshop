const bcrypt = require('bcrypt');
const Users = require('../../api/services/users');
const userService = new Users();

async function basicAuth(req, res, next) {
    try {
        const [email, password] = splitCredentials(req.headers.authorization);

        const user = await userService.findUser({ email: email });
        if (!user) {
            throw new Error('Invalid Authentication Credentials', 401);
        }
    
        if(! (await bcrypt.compareSync(password, user.password))) {
            throw new Error('Invalid Authentication Credentials', 401);
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            error: true,
            message: error.message
        });
    }
}

function splitCredentials(authString) {
    if (!authString || authString.indexOf('Basic ') === -1) {
        throw new Error('Missing Authorization Header', 400);
    }

    const base64Credentials =  authString.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    return credentials.split(':');
}


module.exports = basicAuth;