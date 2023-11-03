const router = require('express').Router();
const furnitureController = require('../controller/furnitureController');
const multer = require('multer');
const upload = multer({ dest: './public/data/uploads/' });

router.route('/').get(furnitureController.getAllFurnitures);

router
  .route('/addFurniture')
  .post(upload.single('image'), furnitureController.createFurniture);

router
  .route('/:id')
  .put(upload.single('image'), furnitureController.updateFurniture);

router.route('/:id').delete(furnitureController.deleteFurniture);

router.route('/reserve').post(furnitureController.reserveFurnitures);

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  throw new Error(err.message);
});

module.exports = router;
