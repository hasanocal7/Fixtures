const { Furniture } = require('../models');

exports.getHomePage = async (req, res) => {
  const furnitures = await Furniture.findAll();
  res.render('index', {
    page_name: 'home',
    furnitures,
  });
};

exports.getAboutPage = (req, res) => {
  res.render('about', {
    page_name: 'about',
  });
};

exports.getContactPage = (req, res) => {
  res.render('contact', {
    page_name: 'contact',
  });
};
exports.getLoginPage = (req, res) => {
  res.render('login', {
    page_name: 'login',
  });
};

exports.getRegisterPage = (req, res) => {
  res.render('register', {
    page_name: 'register',
  });
};

exports.logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};
