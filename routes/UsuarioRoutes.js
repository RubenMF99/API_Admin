
const express = require("express");
const {registrar_user,autenticate} = require("../Controllers/UsuariosControllers");
const router = express.Router();


router.post('/',registrar_user); //create new user
router.post('/login',autenticate);
module.exports = router