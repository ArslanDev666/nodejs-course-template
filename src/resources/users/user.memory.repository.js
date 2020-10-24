/* eslint-disable no-sync */
const User = require('./user.model');

const getAll = async () => User.find();

const getById = async id => User.findById(id);

const createUser = async data => {
  const user = new User(data);
  await user.save();
  return getById(user._id);
};

const updateById = async (id, user) => {
  await User.findByIdAndUpdate(id, user);
  return getById(id);
};
const deleteById = async id => User.deleteOne({ id });

module.exports = { getAll, getById, createUser, updateById, deleteById };
