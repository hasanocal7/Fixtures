const { User } = require('../models');
const { isEmail, equals } = require('validator');
const { comparePassword } = require('../utils/hashPassword');
const jwt = require('jsonwebtoken');

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
        if (!isPasswordCorrect) {
          res.status(401);
          throw new Error('Password is not correct');
        } else {
          if (!user.isVerified) {
            return res.status(200).render('verifyMessage', {
              message:
                'Please verify your account first via the link in your email.',
            });
          }
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          res.redirect('/login');
          throw new Error(err.message);
        } else {
          console.log('Token is Verified');
          next();
        }
      });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.status(401);
    throw new Error('Token is not authorized');
  }
};

exports.checkUser = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
          throw new Error(err.message);
        } else {
          const user = await User.findOne({
            where: { id: decodedToken.UserId },
          });
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  } catch (error) {
    next(error);
  }
};
