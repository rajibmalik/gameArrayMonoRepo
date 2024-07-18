const express = require('express');
const userController = require('../../controllers/apiControllers/userController');

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router.route('/:steamID').get(userController.getUser);

module.exports = router;
