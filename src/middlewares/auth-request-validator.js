const AuthRequestValidator = (req,res,next) =>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success: false,
            data:null,
            message:'',
            err:'email or password missing'
        });
    }
    next();
}

module.exports = {
    AuthRequestValidator
}
