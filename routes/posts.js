// /* 
//     Ruta: /api/v1/posts
// */
const { Router } = require('express');
const { createPost, getPosts, getPostById, deletePost, updatePost} = require('../controllers/postController');
const { validateJWT } = require('../middlewares/validateJWT');
const { postValidator } = require('../Validators/post');

//Inicializamos router
const router = Router();

//Rutas
router.get('/',getPosts);
router.get('/:id',getPostById);
router.post('/',validateJWT,postValidator,createPost);
router.delete('/:id',validateJWT, deletePost);
router.put('/:id',validateJWT,postValidator,updatePost);

module.exports = router;