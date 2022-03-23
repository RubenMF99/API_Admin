
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
    project:{
        type:mongoose.Types.ObjectId,
        ref:"Proyecto"
    }
},
    { 
        timestamps:true
    }
);