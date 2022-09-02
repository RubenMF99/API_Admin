
const express = require("express");
const CheckAuth = require("../middleware/checkAuth");
const {
    registrar_user,
    autenticate,
    confirmar,
    recoverPassword,
    tokenValidation,
    replacePassword,
    perfil
} = require("../Controllers/UsuariosControllers");
const router = express.Router();



router.post('/',registrar_user); //create new user
router.post('/login',autenticate);
router.get('/confirmar/:token',confirmar);
router.post('/recoverpassword',recoverPassword);
router.get('/perfil',CheckAuth,perfil)
router.route('/validation/:token').get(tokenValidation).post(replacePassword);
module.exports = router