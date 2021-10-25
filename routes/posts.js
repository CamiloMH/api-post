// /* 
//     Ruta: /api/v1/posts
// */
const { Router } = require('express');
const { createPost, getPosts, getPostById, deletePost, updatePost} = require('../controllers/postController');
const { validateJWT } = require('../middlewares/validateJWT');

//Inicializamos router
const router = Router();

//Rutas
router.get('/',getPosts);
router.get('/:id',getPostById);
router.post('/',validateJWT,createPost);
router.delete('/:id',validateJWT, deletePost);
router.put('/:id',validateJWT,updatePost);

module.exports = router;