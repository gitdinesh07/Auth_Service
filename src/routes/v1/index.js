const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const UserController = require('../../controllers/user-controller');
const authValidator = require('../../middlewares/index');

router.post('/signup',authValidator.AuthRequestValidator, UserController.create);
router.post('/signin',authValidator.AuthRequestValidator, UserController.signIn);
router.get('/isAuthenticated', UserController.isAuthenticated);
module.exports = router;