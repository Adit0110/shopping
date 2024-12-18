const express = require('express');
const router = express.Router();
const userController=require('../../controllers/userController');

router.get('/list', userController.registerUser);

//router.get('/all', userController.registerUser);

module.exports = router;
