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

const isAuthenticated = async (req, res)=>{
    try {
        const getToken = req.headers['x-access-token'];
        if(getToken){
            const response = await userService.isAuthenticated(getToken);
            res.status(200).json({
                success:true,
                message:'user authenticated successfully',
                data:response
            })
        }
        else
            throw {error:'access token missing'}
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'error occured at isAuthenticated',
            data:null,
            success:false,
            err:error
        })
    }
    
}
module.exports={
    create,
    signIn,
    isAuthenticated
}