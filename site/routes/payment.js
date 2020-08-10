const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/paymentController');

router.post('/', paymentController.processCheckoutAndGeneratePreference);
router.get('/pending', paymentController.pendingPayment);
router.get('/failure', paymentController.failedPayment);
router.get('/success', paymentController.successPayment);

/*
router.get('/', paymentController.renderCheckout);
router.post('/', paymentController.processCheckoutAndGeneratePreference);
router.get('/process', paymentController.processPayment);
*/

module.exports = router;