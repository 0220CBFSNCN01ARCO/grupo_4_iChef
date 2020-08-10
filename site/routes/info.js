const express = require('express');
const router = express.Router();

const infoController = require('../controllers/infoController');
const {userNotLogged } = require('../middleware/authMiddleware');

router.get('/contact',userNotLogged , infoController.getContact);
router.get('/nosotros', infoController.getNosotros);
router.get('/staff', infoController.getStaff);
router.get('/guest', infoController.getGuest);
router.get('/zonas', infoController.getZonas);

module.exports = router;