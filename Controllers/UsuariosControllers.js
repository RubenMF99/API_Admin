const UserModel = require("../models/Usuario");
const generarId =  require("../helpers/generarId");
const generarToken =  require("../helpers/generarJWT");
const {emailRegistro,emailRecuperacion} = require("../helpers/emails");

const registrar_user = async(req,res) => {
    const {email} = req.body;
    const userExist = await UserModel.findOne({email});
        if(userExist){
            const error = new Error("Usuario ya registrado");
            return res.status(400).json({msg:error.message});
        }
        try {
            const usuario = new UserModel(req.body);
            usuario.token = generarId();
            await usuario.save();
            // enviando info al correo
            emailRegistro({
                email:usuario.email,
                name:usuario.name,
                token:usuario.token
            });
            res.json({msg:"Usuario creado correctamente, revisa tu email para confirmar cuenta"})
        } catch (error) {
            console.log(error);
        }
} 

const autenticate = async (req,res)=>{

      const {email,password} = req.body;
      const user = await UserModel.findOne({email});

      if(!user){
            const error = new Error("El usuario no existe");
            res.status(404).json({msg:error.message});
      }

      if(!user.confirmado){
            const error = new Error("El usuario no esta autenticado");
            res.status(403).json({msg:error.message});
      }
      //Usando metodo para validar password
      if(await user.comprobarPassword(password)){
            res.json({
              _id:user._id,
              nombre:user.name,
              email:user.email,
              token:generarToken(user._id)
            })
      }else{
            const error = new Error("El password es incorrecto");
            res.status(403).json({msg:error.message});
      }
}

const confirmar = async (req,res)=>{
    const {token} = req.params;
    const confirnUser =  await UserModel.findOne({token});
        if(!confirnUser){
                const error = new Error("Token invalido");
                return res.status(404).json({msg:error.message});
        }
        try {
            confirnUser.confirmado = true;
            confirnUser.token = "";
            await confirnUser.save();
            return res.json({
                msg:'Usuario autenticado'
            });
        } catch (error) {
          console.log(error);
        }
}
const recoverPassword = async (req,res)=>{
    const {email} = req.body;
    const User = await UserModel.findOne({email});
    if(!User){
        const error = new Error("Su usuario no existe");
        return res.status(404).json({msg:error.message});
    }
    try{
        User.token = generarId();
        await User.save();
        const {token, name} = User;
        emailRecuperacion( {
            nombre:User.name,
            email:User.email,
            token:User.token});
        res.json({msg:"Hemos enviado un email con las instrucciones"});

    }catch(error){
        console.log(error);
    }
}
const tokenValidation = async (req,res) =>{
    const {token} = req.params;
    const User = await UserModel.findOne({token});
    if(!User){
        const error = new  Error("Token invalido");
        return res.status(404).json({msg:error.message});
    }else{
        res.json({msg:"Token valido"});
    }
}
const replacePassword = async(req,res) => {
    const {token} = req.params;
    const {password} = req.body;
    const user = await UserModel.findOne({token});
    if(!user){
        const error = new  Error("Token invalido");
        return res.status(404).json({msg:error.message});
    }
    try{
        user.password = password;
        user.token = '';
        await user.save();
        res.json({msg:"Password actualizado con exito"});
        }catch(error){
            console.log(error);
    }
}


const perfil = async (req,res) =>{
    const {usuario} = req; 
    console.log(usuario);
}
module.exports = {
    registrar_user,
    autenticate,
    confirmar,
    recoverPassword,
    tokenValidation,
    replacePassword,
    perfil
} 

