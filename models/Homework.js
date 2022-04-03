
const mongoose = require('mongoose');


const HomeworkModel = mongoose.Schema({
    nameHomework:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    statusHomework:{
        type:Boolean,
        default:false
    },
    deliveryDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    priority:{
        type:String,
        required:true,
        enum:['baja','media','alta']
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Proyecto"
    }
},
    { 
        timestamps:true
    }
);
module.exports = mongoose.model("homework",HomeworkModel);