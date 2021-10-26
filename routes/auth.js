/* 
    Ruta: api/v1/auth
*/
const { Router } = require('express');
const { login } = require('../controllers/authController');
const { loginValidator } = require('../Validators/login');

//Inicializamos router
const router = Router();

//Rutas
router.post('/',loginValidator,login);

module.exports = router;