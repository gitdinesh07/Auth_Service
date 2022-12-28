const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const UserController = require('../../controllers/user-controller');

router.post('/signup',UserController.create);
router.post('/signin',UserController.signIn);
module.exports = router;