const { User } = require('../models');
const { isEmail, equals } = require('validator');
const { comparePassword } = require('../utils/hashPassword');

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

exports.beforeLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!isEmail(email)) {
      res.status(400);
      throw new Error('Please enter a email (@gmail.com, @hotmail.com, etc.)');
    } else {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        res.status(404);
        throw new Error('User not found');
      } else {
        const isPasswordCorrect = await comparePassword(
          password,
          user.password
        );
        console.log(isPasswordCorrect);
        if (!isPasswordCorrect) {
          res.status(401);
          throw new Error('Password is not correct');
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
