const ProyectoModel = require("../models/Proyecto");
const HomeworkModel = require("../models/Homework");

const createdProject = async(req,res)=>{
    const {nameProject} = req.body;
    console.log(req.usuario);
    const {_id} = req.usuario;
    const projectExist = await ProyectoModel.findOne({nameProject,creator:_id});
    if(projectExist){
        const error = new Error("El proyecto ya existe");
        return res.status(403).json({msg:error.message});
    }
     
    try{
        const project = new ProyectoModel(req.body);
        project.creator = req.usuario._id;
        const save =  await project.save();
        res.json({msg:save});
    }catch(error){
        console.log(error);
    }
}

const obtenerProject = async (req,res) =>{
   const {id} = req.params;
   const project = await ProyectoModel.findById(id);
   if(!project){
       const error = new Error("El proyecto no existe");
       return res.status(402).json({msg:error.message});
   }
   if(project.creator.toString() !== req.usuario._id.toString()){
        const error = new Error("Accion no valida");
        return res.status(402).json({msg:error.message});
   }
   //Consultando tareas asociadas
   const homework = await HomeworkModel.find().where("Proyecto").equals(project._id);
   res.json({
       project,
       homework
   });
}

const obtenerProyectos = async(req,res) =>{
    const Projects = await ProyectoModel.find().where("creator").equals(req.usuario);
    res.json({msg:Projects});
}
const updateProject = async (req,res) => {
    const {id} = req.params;
   const project = await ProyectoModel.findById(id);
   if(!project){
       const error = new Error("El proyecto no existe");
       return res.status(402).json({msg:error.message});
   }
   if(project.creator.toString() !== req.usuario._id.toString()){
        const error = new Error("Accion no valida");
        return res.status(402).json({msg:error.message});
   }
   try{
        let actualizado =  await ProyectoModel.findByIdAndUpdate(id,req.body);
        return res.json(actualizado);
   }catch(error){
        console.log(error);
   }
   
}

const deleteProject = async (req,res) => {
    const {id} = req.params;
    const project = await ProyectoModel.findById(id);
    if(!project){
        const error = new Error("El proyecto no existe");
        return res.status(402).json({msg:error.message});
    }
    if(project.creator.toString() !== req.usuario._id.toString()){
         const error = new Error("Accion no valida");
         return res.status(402).json({msg:error.message});
    }
    try{
         let deleteProject =  await ProyectoModel.findByIdAndDelete(id);
         return res.json(deleteProject );
    }catch(error){
         console.log(error);
    }
}
const deleteColaborator = async (req,res) => {}
const agregateColaborator = async (req,res) => {}

module.exports ={
    createdProject,
    obtenerProject,
    obtenerProyectos,
    updateProject,
    deleteProject,
    deleteColaborator,
    agregateColaborator
}