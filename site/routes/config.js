const express = require('express');
const router = express.Router();

const configController = require('../controllers/configController');
const {userNotLogged } = require('../middleware/authMiddleware');

router.get('/',userNotLogged, configController.getConfig);

router.get('/Marcas' ,userNotLogged, configController.getMarcas);
router.get('/Rubros' ,userNotLogged, configController.getRubros);
router.get('/Ingredientes' ,userNotLogged, configController.getIngredientes);
router.get('/Tipos' ,userNotLogged, configController.getTipos);
router.get('/Roles' ,userNotLogged, configController.getRoles);
router.get('/Comensales' ,userNotLogged, configController.getComensales);

router.post('/addMarca',userNotLogged, configController.addMarca);
router.post('/addRubro',userNotLogged, configController.addRubro);
router.post('/addIngrediente', userNotLogged,configController.addIngrediente);
router.post('/addTipo', userNotLogged,configController.addTipo);
router.post('/addComensal', userNotLogged,configController.addComensal);
router.post('/addEstadoUser', userNotLogged,configController.addEstadoUser);


/*
/api/tutorials?page=1&size=5
/api/tutorials?size=5: using default value for page
/api/tutorials?page=1: using default value for size
/api/tutorials?title=data&page=1&size=3: pagination & filter by title containing ‘data’
*/

module.exports = router;