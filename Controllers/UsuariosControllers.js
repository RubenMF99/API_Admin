const UserModel = require("../models/Usuario");
const {generarId} = require("../helpers/generarId");

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
      const usersave = await usuario.save();
      res.json({msg:usersave})
  } catch (error) {
      console.log(error);
  }
} 

const autenticate = async (req,res)=>{

}

module.exports = {
    registrar_user,
    autenticate
} 

