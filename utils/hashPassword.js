const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = async (password) => {
  console.log(password)
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw error;
  }
  finally{
    console.log('zort')
  }
};
