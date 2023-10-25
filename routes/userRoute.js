const router = require('express').Router();
const authController = require('../controller/authController');

router.route('/signup').post(authController.createUser);
router.route('/signin').post(authController.loginUser);

module.exports = router;