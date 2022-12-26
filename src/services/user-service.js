const UserRepository = require('../repositories/user-repository');

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

}

module.exports = UserService;