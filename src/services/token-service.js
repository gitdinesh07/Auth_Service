const {JWT_KEY} = require('../config/serverConfig');
const jwt = require('jsonwebtoken');

class TokenService
{
    createToken(data) {
        try {
            let token = jwt.sign(data,JWT_KEY,{expiresIn:'1h'});
            return token;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    verifyToken(token) {
        try {
            return jwt.verify(token,JWT_KEY);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}


module.exports = TokenService;