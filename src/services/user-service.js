const UserRepository = require('../repositories/user-repository');
const bycrpt = require('bcrypt');
const TokenService = require('./token-service');
class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);  
            return user;
        } catch (error) {
            console.log('error at user service');
            throw error;
        }       
    }

    checkPassword(plainPassword, encryptedPassword){
        try {
            let isMatch = bycrpt.compareSync(plainPassword,encryptedPassword);
            return isMatch;
        } catch (error) {
            console.log('error occured in check password');
            throw error;
        }
    }

    async signIn(email,password){
        try {
            let user =await this.userRepository.getByEmail(email);
            if(user != null){
                let isPasswordMatch = this.checkPassword(password, user.password);               
                if(isPasswordMatch){
                    let tokenService = new TokenService();
                    const getToken = await tokenService.createToken({email:user.email,userId:user.id});
                    return getToken;
                }
                else
                    throw {error:  'password incorrect'};       
            }
            else
                throw {error: 'this email does not exist'};       
        } catch (error) {
            console.log('error occured in signIn');
            throw error;
        }
    }
}

module.exports = UserService;