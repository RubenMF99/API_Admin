const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioShema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    token:{
        type:String
    },
    confirmado:{
        type:Boolean,
        default:false
    },
},
{
    timestamps:true,
}
);

usuarioShema.pre("save", async function(next) {
    //verificando que el password no este hasheado
    if(!this.isModified("password")){
        next();
    }
    //Hasheando password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

usuarioShema.methods.comprobarPassword = async function (passwordForm){
    return await bcrypt.compare(passwordForm,this.password);
}

const Usuario = mongoose.model("Usuario",usuarioShema);
module.exports = Usuario;