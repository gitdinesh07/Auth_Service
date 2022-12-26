const {User} = require('../models/index');

class UserRepository
{
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        }
        catch(err) {
            console.log("some error at repository layer");
            throw err;
        }
    }

    async destroy(userId)
    {
        try {
            await User.destroy({
                where:{
                    id:userId
                }
            })
        }
        catch(err) {
            console.log("some error at repository layer");
            throw err;
        }
    }
}

module.exports = UserRepository;