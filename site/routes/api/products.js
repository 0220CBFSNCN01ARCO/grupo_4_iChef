var express = require('express');
var router = express.Router();
const apiProductsController = require('../../controllers/api/apiProductsController');

router.get('/',apiProductsController.listProducts);
router.get('/:id',apiProductsController.productByID);

module.exports = router;