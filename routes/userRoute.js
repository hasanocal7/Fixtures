const router = require('express').Router();
const userAuth = require('../middleware/userAuth');
const authController = require('../controller/authController');

router.route('/signup').post(userAuth.beforeCreate, authController.createUser);
router.route('/signin').post(authController.loginUser);

module.exports = router;
