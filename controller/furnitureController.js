const { Furniture } = require('../models');
const multer = require('multer');

exports.createFurniture = async (req, res) => {
  try {
    if (req.file instanceof multer.MulterError) {
      res.status(400);
      throw new Error('Resim yüklenirken Multer kaynaklı hata oluştu');
    } else if (!req.file) {
      res.status(400);
      throw new Error({ error: 'Lütfen bir resim yükleyin' });
    } else {
      const imageFileName = '/uploads/' + req.file.filename;
      const furniture = await Furniture.create({
        ...req.body,
        image: imageFileName,
      });
      res.status(201).redirect('/users/dashboard');
    }
  } catch (error) {
    console.error('Beklenmeyen bir hata oluştu:', error);
    res.status(500).json({ error: 'Beklenmeyen bir hata oluştu' });
  }
};
