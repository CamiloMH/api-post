/* 
    Ruta: api/v1/auth
*/
const { Router } = require('express');
const { login } = require('../controllers/authController');

//Inicializamos router
const router = Router();

//Rutas
router.post('/',login);

module.exports = router;