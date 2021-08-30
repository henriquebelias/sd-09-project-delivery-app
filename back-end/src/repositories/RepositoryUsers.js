const { User } = require('../database/models');

const getByUser = async ({ email, password }) => {
  const findUser = await User.findOne({ where: { email, password } });

  return findUser;
};

const getByEmail = async ({ email }) => {
  const findEmail = await User.findOne({ where: { email } });

  return findEmail;
};

const getByName = async ({ name }) => {
  const findName = await User.findOne({ where: { name } });

  return findName;
};

const create = async ({ name, email, password, role }) => {
  const newUser = await User.create({ name, email, password, role });

  return newUser.dataValues;
};

module.exports = {
  getByUser,
  getByEmail,
  getByName,
  create,
};
