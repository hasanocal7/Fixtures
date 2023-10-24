const router = require('express').Router();
const pageController = require('../controller/pageController');

router.route('/').get(pageController.getHomePage);

module.exports = router;
