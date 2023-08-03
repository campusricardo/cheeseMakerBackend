const { Router } = require('express');
const { check } = require('express-validator');
const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');

const { getCategoria,
      postCategoria,
      deleteCategoria,
      putCategoria
      } = require('../controllers/categoria.controllers.js');


const router = Router();

/**
 * localhost/api/categorias
 */




// Crear categoria - privado - cualquier persona con un token válido
router.get('/',[
      getCategoria
]);
router.post('/', [ 
   validateJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('estado',' El estado es obligatorio').not().isEmpty(),
    validateDocuments
], postCategoria );

router.delete('/:id', [
      validateJWT,
      validateDocuments,
      deleteCategoria
]);

router.put('/:id', [
      validateJWT,
      check('nombre','El nombre es obligatorio').not().isEmpty(),
      validateDocuments,
      putCategoria
])

module.exports = router;