const loginRepo = require('./login.memory.repository');

const findUser = async (username, password) =>
  loginRepo.findUser(username, password);

module.exports = { findUser };
