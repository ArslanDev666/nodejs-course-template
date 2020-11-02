/* eslint-disable no-sync */
const User = require('../users/user.model');
const bcrypt = require('bcrypt');

const findUser = async (username, password) => {
  const users = await User.find();
  const user = users.find(userItem => userItem.name === username);
  if (!user) return;
  const candidate = await bcrypt.compare(password, user.password);
  if (!candidate) return;
  return user;
};

module.exports = { findUser };
