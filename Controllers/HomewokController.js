const HomeworkModel = require('../models/Homework');
const ProjectModel = require('../models/Proyecto');

const obtenerHomework = async (req,res) => {
    const {id} = req.params;
    const Homework = await HomeworkModel.findById(id).populate("project");
    if(!Homework){
        const error = new Error('Homework not found');
        res.status(202).json({msg:error.message});
    }
    
    if(Homework.project.creator.toString() !== req.usuario._id.toString()){
        const error = new Error("The user not is creator as project");
        return res.status(402).json({msg:error.message});
    }
    res.json(Homework);
}

const agregateHomework = async (req,res) =>{  
    const {project} = req.body;
    const existed = await ProjectModel.findById(project);
    if(!existed){
        const error = new Error("the projet not exist");
        return res.status(404).json({msg:error.message});
    }

    if(existed.creator.toString() !== req.usuario._id.toString()){
        const error = new Error("The user not is creator as project");
        return res.status(402).json({msg:error.message});
    }

    try{
        const newhomework = await HomeworkModel.create(req.body);
        res.json(newhomework);
    }catch(error){
        console.log(error);
    }

}

const updateHomewok = async (req,res) =>{
    const {id} = req.params;
    const Homework = await HomeworkModel.findById(id).populate("project");
    if(!Homework){
        const error = new Error('Homework not found');
        res.status(202).json({msg:error.message});
    }
    
    if(Homework.project.creator.toString() !== req.usuario._id.toString()){
        const error = new Error("The user not is creator as project");
        return res.status(402).json({msg:error.message});
    }

    try{
        let actualizado =  await HomeworkModel.findByIdAndUpdate(id,req.body);
        return res.json(actualizado);
    }catch(error){
        console.log(error);
    }
}
const deleteHomework = async (req,res) =>{
    const {id} = req.params;
    const Homework = await HomeworkModel.findById(id).populate("project");
    if(!Homework){
        const error = new Error('Homework not found');
        res.status(202).json({msg:error.message});
    }
    
    if(Homework.project.creator.toString() !== req.usuario._id.toString()){
        const error = new Error("The user not is creator as project");
        return res.status(402).json({msg:error.message});
    }
    try{
        let eliminada =  await HomeworkModel.findByIdAndDelete(id);
        return res.json(eliminada);
    }catch(error){
        console.log(error);
    }
} 
const cambiaEstado = async (req,res) => {

}


module.exports = {
    obtenerHomework,
    agregateHomework,
    updateHomewok,
    deleteHomework,
    cambiaEstado 
}
