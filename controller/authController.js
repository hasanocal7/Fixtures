const { error } = require('console');
const { User, Token } = require('../models');
const { hashPassword } = require('../utils/hashPassword');
const { sendingMail } = require('../utils/mailings');
const crypto = require('crypto');

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });
    if (user) {
      const token = await Token.create({
        UserId: user.id,
        token: crypto.randomBytes(16).toString('hex'),
      });

      sendingMail({
        from: 'no-reply@example.com',
        to: `${email}`,
        subject: 'Account Verification Link',
        text: `Hello, ${user.name} Please verify your email by
              clicking this link :
              http://localhost:${process.env.PORT}/users/verify-email/${user.id}/${token.token} `,
      });

      if (!token) {
        res.status(500);
        throw new Error('Token creation failed');
      }
    } else {
      res.status(500);
      throw new Error('User creation failed');
    }

    res.status(201).send(user);
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
