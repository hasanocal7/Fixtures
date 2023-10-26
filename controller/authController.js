const { User, Token } = require('../models');
const { hashPassword } = require('../utils/hashPassword');
const { sendingMail } = require('../utils/mailing');
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

    //if user details is captured
    //create a token with crypto.js
    console.log(user);
    if (user) {
      let setToken = await Token.create({
        userId: user.id,
        token: crypto.randomBytes(16).toString('hex'),
      });

      console.log(setToken);

      /* //if token is created, send the user a mail
      if (setToken) {
        //send email to the user
        //with the function coming from the mailing.js file
        //message containing the user id and the token to help verify their email
        const verificationMessage = sendingMail({
          from: 'no-reply@example.com',
          to: `${email}`,
          subject: 'Account Verification Link',
          text: `Hello, ${userName} Please verify your email by
                clicking this link :
                http://localhost:${process.env.PORT}/users/verify-email/${user.id}/${setToken.token} `,
        });

        console.log(verificationMessage);

        //if token is not created, send a status of 400
      } else {
        res.status(400);
        throw new Error('Token not created');
      } */

      console.log('user', JSON.stringify(user, null, 2));

      //send users details
      res.status(201).send(user);
    } else {
      res.status(409);
      throw new Error('Details are not correct');
    }
  } catch (error) {
    next(error);
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    const usertoken = await Token.findOne({
      token,
      where: {
        userId: req.params.id,
      },
    });
    console.log(usertoken);

    if (!usertoken) {
      res.status(400);
      throw new Error(
        'Your verification link may have expired. Please click on resend for verify your Email.'
      );

      //if token exist, find the user with that token
    } else {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        console.log(user);

        res.status(401);
        throw new Error(
          'We were unable to find a user for this verification. Please SignUp!'
        );

        //if user is already verified, tell the user to login
      } else if (user.isVerified) {
        res.status(200).send('User has been already verified. Please Login');

        //if user is not verified, change the verified to true by updating the field
      } else {
        const updated = await User.update(
          { isVerified: true },
          {
            where: {
              id: usertoken.userId,
            },
          }
        );
        console.log(updated);

        //if not updated send error message
        if (!updated) {
          res.status(500);
          throw new Error(err.message);
          //else send status of 200
        } else {
          res.status(200).send('Your account has been successfully verified');
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
