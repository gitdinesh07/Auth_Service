const user = require('../models/user');
const UserService = require('../services/user-service');


const userService = new UserService();

const create = async (req,res)=>{
    try {
        const response = await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            success:true,
            message:'successfully created new user',
            data:response,
            err:null
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'error occured',
            data:null,
            success:false,
            err:error
        })
    }
}

const signIn = async (req,res)=>{
    try {
        const getResponse = await userService.signIn(req.body.email,req.body.password);
        return res.status(201).json({
            success:true,
            token:getResponse,
            message:'successfully token created',
            err:null
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'error occured',
            data:null,
            success:false,
            err:error
        })
    }
}

module.exports={
    create,
    signIn
}