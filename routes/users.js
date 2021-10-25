/* 
    Ruta: /api/v1/users
*/
const { Router } = require('express');
const { getUsers, createUser, removeUser, updateUser, getUser} = require('../controllers/usersController');
const { validateJWT } = require('../middlewares/validateJWT');
const { userValidator } = require('../Validators/user');

//Inicializamos router
const router = Router();

//Rutas
router.get('/',validateJWT,getUsers);
router.get('/:id',validateJWT,getUser);
router.post('/',userValidator,createUser);
router.delete('/:id',validateJWT, removeUser);
router.put('/:id',validateJWT,updateUser);  

module.exports = router;