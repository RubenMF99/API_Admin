const jwt = require('jsonwebtoken');
const UserModel = require("../models/Usuario");

const Chekauth = async(req,res,next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decodificate = jwt.verify(token,process.env.JWT_SECRET);
            req.usuario = await UserModel.findById(decodificate.id).select("-password -confirmado -token -createdAt -updatedAt -__v")
            return next();
        }catch(error){
           return res.status(404).json({msg:"Hubo un error"});
        }
    }

    if(!token){
        const error = new Error("Token invalido");
        res.status(401).json({msg:error.message});
    }
     next();
}

module.exports = Chekauth;