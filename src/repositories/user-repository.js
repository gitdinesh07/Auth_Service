const {User} = require('../models/index');

class UserRepository
{
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        }
        catch(error) {
            console.log("some error at repository layer");
            throw error;
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
        catch(error) {
            console.log("some error at repository layer");
            throw error;
        }
    }

    async getById(userId){
        try {
            return await User.findByPk(userId,{
                attributes:['email','id']
            });
        } catch (error) {
            console.log("some error at repository layer");
            throw error;
        }
    }

    async getByEmail(emailId){
        try {
            const user =  await User.findOne({
                where:{
                    email:emailId
                }
            });
            return user;
        } catch (error) {
            console.log("some error at repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;