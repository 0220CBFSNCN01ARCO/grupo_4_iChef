const express = require('express');
const router = express.Router();

const configController = require('../controllers/configController');

router.get('/', configController.getConfig);

router.get('/marcas/:pagina', configController.getConfig);


router.post('/addMarca', configController.addMarca);

router.post('/addRubro', configController.addRubro);

/*
/api/tutorials?page=1&size=5
/api/tutorials?size=5: using default value for page
/api/tutorials?page=1: using default value for size
/api/tutorials?title=data&page=1&size=3: pagination & filter by title containing ‘data’
*/

module.exports = router;