/* 
    Ruta: /api/v1/users
*/
const { Router } = require('express');
const { getUsers, createUser, removeUser, updateUser, getUser} = require('../controllers/usersController');

//Inicializamos router
const router = Router();

//Rutas
router.get('/',getUsers);
router.get('/:id',getUser);
router.post('/',createUser);
router.delete('/:id', removeUser);
router.put('/:id',updateUser);

module.exports = router;