const express = require("express");
const Checkauth = require("../middleware/checkAuth");
const {
    obtenerHomework,
    agregateHomework,
    updateHomewok,
    deleteHomework,
    cambiaEstado
} = require("../Controllers/HomewokController");

const router = express.Router();

router.post('/', Checkauth,agregateHomework);
router.route('/:id').get( Checkauth,obtenerHomework).put( Checkauth,updateHomewok).delete( Checkauth,deleteHomework);
router.post('/estado/:id', Checkauth,cambiaEstado);

module.exports = router;