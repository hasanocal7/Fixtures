const { Op } = require('sequelize');
const { Furniture, User, Reserve } = require('../models');
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
      const imageFileName = '/data/uploads/' + req.file.filename;
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
    const user = await User.findOne({ where: { id: res.locals.user.id } });
    const reserve = await Reserve.findAll({
      where: { UserId: res.locals.user.id },
    });
    const query = req.query.search;
    const category = req.query.category;
    let filter = {};

    if (query) {
      filter.name = { [Op.like]: `%${query}%` };
    }

    if (category) {
      filter.category = category;
    }

    const furnitures = await Furniture.findAll({ where: filter });
    res.status(200).render('furnitures', {
      page_name: 'furnitures',
      furnitures,
      user,
      reserve,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateFurniture = async (req, res, next) => {
  try {
    if (req.file instanceof multer.MulterError) {
      res.status(400);
      throw new Error('Multer error loading image');
    } else if (!req.file) {
      res.status(400);
      throw new Error('Please upload a picture');
    } else {
      const imageFileName = '/data/uploads/' + req.file.filename;
      const furniture = await Furniture.update(
        {
          ...req.body,
          image: imageFileName,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.status(200).redirect('/users/dashboard');
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteFurniture = (req, res, next) => {
  try {
    Furniture.destroy({ where: { id: req.params.id } });
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    next(error);
  }
};

exports.reserveFurnitures = async (req, res, next) => {
  try {
    const { FurnitureId, name, category } = req.body;
    const user = await User.findOne({ where: { id: res.locals.user.id } });
    const newReserve = await Reserve.create({
      name: name,
      category: category,
      UserId: user.id,
      FurnitureId: FurnitureId,
    });
    if (newReserve) {
      await Furniture.update(
        {
          isReserved: true,
        },
        { where: { id: FurnitureId } }
      );
    }
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    next(error);
  }
};
