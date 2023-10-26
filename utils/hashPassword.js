const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    console.log('Password is hashed!');
  }
};
