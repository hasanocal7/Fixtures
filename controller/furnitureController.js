const { Furniture } = require('../models');
const multer = require('multer');

exports.createFurniture = async (req, res) => {
  try {
    if (req.file instanceof multer.MulterError) {
      res.status(400);
      throw new Error('Multer error loading image');
    } else if (!req.file) {
      res.status(400);
      throw new Error('Please upload a picture');
    } else {
      const imageFileName = '/uploads/' + req.file.filename;
      const furniture = await Furniture.create({
        ...req.body,
        image: imageFileName,
      });
      res.status(201).redirect('/users/dashboard');
    }
  } catch (error) {
    res.status(500);
    throw new Error('An unexpected error occurred');
  }
};

exports.getAllFurnitures = async (req, res, next) => {
  try {
    const furnitures = await Furniture.findAll();
    res.status(200).json(furnitures);
  } catch (error) {
    next(error);
  }
};
