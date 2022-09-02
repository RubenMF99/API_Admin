const mongoose = require("mongoose");

const ProyectoShema = mongoose.Schema({
    nameProject:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    deliverDate:{
        type:Date,
        default:Date.now()
    },
    client:{
        type:String,
        required:true,
        trim:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
    },
    colaborator:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Usuario",
        }
    ]
},
    {
        timestamps:true
    }
);


module.exports = mongoose.model("Proyecto",ProyectoShema);