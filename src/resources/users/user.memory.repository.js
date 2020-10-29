/* eslint-disable no-sync */
const User = require('./user.model');
const bcrypt = require('bcrypt');

const getAll = async () => User.find();

const getById = async id => User.findById(id);

const createUser = async data => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  const userData = { ...data, password: hashPassword };
  const user = new User(userData);
  await user.save();
  return getById(user._id);
};

const updateById = async (id, user) => {
  await User.findByIdAndUpdate(id, user);
  return getById(id);
};
const deleteById = async id => User.deleteOne({ id });

const createUserAdmin = async () => {
  const hashPassword = await bcrypt.hash('admin', 10);
  const admin = new User({
    name: 'admin',
    login: 'admin',
    password: hashPassword
  });
  const candidate = await User.findOne({ login: 'admin' });
  if (!candidate) {
    await admin.save();
  }
  return;
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateById,
  deleteById,
  createUserAdmin
};
