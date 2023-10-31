const { Furniture } = require('../models');

exports.createFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.create(req.body);
    res.status(201).json(furniture);
  } catch (error) {
    res.status(400);
    throw new Error('Something wrong');
  }
};
