const dotenv = require('dotenv');
const bycrpt = require('bcrypt');
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    SALT : bycrpt.genSaltSync(5),
    JWT_KEY: process.env.JWT_KEY
}