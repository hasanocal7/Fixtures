const { User } = require('../models');
const { isEmail, equals } = require('validator');
const { hashPassword } = require('../utils/hashPassword');

exports.createUser = async (req, res, next) => {
  try {
    const { email, password, c_password } = req.body;
    if (isEmail(email)) {
      if (equals(password, c_password)) {
        const hashedPassword = await hashPassword(password);
        const foundUser = User.findOne({ where: { email: email } });
        if (foundUser) {
          res.status(400);
          throw new Error('Already Registered');
        } else {
          const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
          });
          console.log(user.password);
          res.status(201).send(user);
        }
      } else {
        res.status(400);
        throw new Error('Passwords are not matched');
      }
    } else {
      res.status(400);
      throw new Error('Please enter a email');
    }
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = req.body;
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
