const express = require('express');
const router = express.Router();

const apiUsersController = require('../../controllers/api/apiUsersController');

router.get('/',apiUsersController.listUsers);
router.get('/:id',apiUsersController.userByID);


module.exports = router;
