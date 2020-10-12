/* eslint-disable no-sync */
const User = require('./user.model');
const DB = require('../../data/DB').users;

const getAll = async () => DB;

const getById = async id => DB.find(cur => cur.id === id);

const createUser = async data => {
  const user = new User(data).toJSON();
  DB.push(user);
  return getById(user.id);
};

const updateById = async (id, user) => {
  const idx = DB.findIndex(cur => cur.id === id);
  DB[idx] = { ...user };
  return getById(id);
};
const deleteById = async id => DB.filter(cur => cur.id !== id);

module.exports = { getAll, getById, createUser, updateById, deleteById };
