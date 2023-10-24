const router = require('express').Router();
const pageController = require('../controller/pageController');

router.route('/').get(pageController.getHomePage);
router.route('/about').get(pageController.getAboutPage);
router.route('/furnitures').get(pageController.getFurnituresPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/login').get(pageController.getLoginPage);
router.route('/register').get(pageController.getRegisterPage);

module.exports = router;
