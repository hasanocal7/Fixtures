const { Furniture, Reserve } = require('../models');

exports.checkReserv = async (req, res, next) => {
  try {
    const furnitures = await Furniture.findAll({ where: { isReserved: true } });
    for (let i = 0; i < furnitures.length; i++) {
      const reserve = await Reserve.findOne({
        where: { FurnitureId: furnitures[i].id },
      });
      if (furnitures[i].isReserved && reserve) {
        continue;
      } else if (furnitures[i].isReserved && !reserve) {
        await Furniture.update(
          {
            isReserved: false,
          },
          { where: { id: furnitures[i].id } }
        );
      } else {
        res.status(404);
        throw new Error('Furniture and Reserve not found');
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
