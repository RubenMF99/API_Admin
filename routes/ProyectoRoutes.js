const express = require("express");
const Checkauth = require("../middleware/checkAuth");
const {
    createdProject,
    obtenerProject,
    obtenerProyectos,
    updateProject,
    deleteProject,
    deleteColaborator,
    agregateColaborator,
    obtenerHomework 
} = require("../Controllers/ProyectoController");

const router = express.Router();

router
    .route('/')
    .get(Checkauth,obtenerProyectos)
    .post(Checkauth,createdProject);
router
    .route('/:id')
    .get(Checkauth,obtenerProject)
    .delete(Checkauth,deleteProject)
    .put(Checkauth,updateProject);

router.post('/new-colaborator',Checkauth,agregateColaborator);
router.post('/delete-colaborator/:id',Checkauth,deleteColaborator);

module.exports = router;