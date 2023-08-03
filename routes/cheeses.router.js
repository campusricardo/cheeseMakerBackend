const { Router } = require('express');
const { check } = require('express-validator');
const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');

const {    getCheese,
    postCheese,
    deleteCheese,
    putCheese
      } = require('../controllers/cheeses.controllers.js');


const router = Router();

router.get('/',[
    getCheese
]);
router.post('/', [ 
   validateJWT, 
    check('name','The name is required').not().isEmpty(),
    check('state','The state of the cheese is required').not().isEmpty(),
    check('price','The price of the cheese is required').not().isEmpty(),
    check('avaliable', 'The avaliable value is required').not().isEmpty(),
    validateDocuments
], postCheese );

router.delete('/:id', [
      validateJWT,
      validateDocuments,
      deleteCheese
]);

router.put('/:id', [
      validateJWT,
      check('name','The name is required').not().isEmpty(),
      validateDocuments,
      putCheese
])

module.exports = router;