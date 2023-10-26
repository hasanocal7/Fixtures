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

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    //find user by token using the where clause
    const usertoken = await Token.findOne({
      token,
      where: {
        userId: req.params.id,
      },
    });
    console.log(usertoken);

    //if token doesnt exist, send status of 400
    if (!usertoken) {
      return res.status(400).send({
        msg: 'Your verification link may have expired. Please click on resend for verify your Email.',
      });

      //if token exist, find the user with that token
    } else {
      console.log(req.params.id);
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        console.log(user);

        return res.status(401).send({
          msg: 'We were unable to find a user for this verification. Please SignUp!',
        });

        //if user is already verified, tell the user to login
      } else if (user.isVerified) {
        return res
          .status(200)
          .send('User has been already verified. Please Login');

        //if user is not verified, change the verified to true by updating the field
      } else {
        const updated = await User.update(
          { isVerified: true },
          {
            where: {
              id: usertoken.UserId,
            },
          }
        );
        console.log(updated);

        //if not updated send error message
        if (!updated) {
          return res.status(500).send({ msg: err.message });
          //else send status of 200
        } else {
          return res
            .status(200)
            .send('Your account has been successfully verified');
        }
      }
    }
  } catch (error) {
    console.log(error);
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
