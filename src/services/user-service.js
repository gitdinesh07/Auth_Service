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

    async isAuthenticated(token){
        try {
            const tokenService = new TokenService();
            const getResponse = tokenService.verifyToken(token);
            if(!getResponse){
                throw {error:'invalid token'};
            }
            //check whether user still exist or active or not
            const user = this.userRepository.getById(getResponse.id);
            if(!user){
                throw {error:'user not exist anymore with corresponding token'}
            }
            return user.id;         
        } catch (error) {
            throw error;
        }
    }

    async isAdmin(userId){
        try{
            return await this.userRepository.isAdmin(userId);
        }catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;