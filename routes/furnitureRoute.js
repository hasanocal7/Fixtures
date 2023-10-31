const router = require('express').Router();
const furnitureController = require('../controller/furnitureController');

router.route('/addFurniture').post(furnitureController.createFurniture);

module.exports = router;
