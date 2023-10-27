const router = require('express').Router();
const userAuth = require('../middleware/userAuth');
const authController = require('../controller/authController');

router.route('/signup').post(userAuth.beforeCreate, authController.createUser);
router.route('/signin').post(userAuth.beforeLogin, authController.loginUser);
router.route('/verify-email/:id/:token').get(authController.verifyEmail);
router
  .route('/dashboard')
  .get(userAuth.authenticateToken, authController.getDashboardPage);

module.exports = router;
