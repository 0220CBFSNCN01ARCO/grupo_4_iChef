var express = require('express');
var router = express.Router();
const apiCategoriesController = require('../../controllers/api/apiCategoriesController');

router.get('/',apiCategoriesController.listCategories);

module.exports = router;