const { User } = require('../models');
const { isEmail, equals } = require('validator');

exports.beforeCreate = async (req, res, next) => {
  try {
    // Check Email
    const { email, password, c_password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!isEmail(email)) {
      res.status(400);
      throw new Error('Please enter a email');
    } else {
      if (!equals(password, c_password)) {
        res.status(400);
        throw new Error('Passwords are not matched');
      } else {
        if (user) {
          res.status(400);
          throw new Error('Already Registered');
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
