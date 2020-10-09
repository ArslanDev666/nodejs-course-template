const path = require('path');
const fs = require('fs');
const User = require('./user.model');
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'users.json'
);
const getAll = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(p, 'utf-8', (err, data) => {
      if (err) reject(err);

      resolve(JSON.parse(data));
    });
  });
};

const getById = async id => {
  const users = await getAll();

  return users.find(cur => cur.id === id);
};

const createUser = async data => {
  const users = await getAll();
  const user = new User(data).toJSON();

  users.push(user);

  return new Promise((resolve, reject) => {
    fs.writeFile(p, JSON.stringify(users), err => {
      if (err) reject(err);

      resolve(User.toResponse(user));
    });
  });
};

const updateById = async (id, user) => {
  const users = await getAll();
  const idx = users.findIndex(cur => cur.id === id);
  users[idx] = { ...user };
  return new Promise((resolve, reject) => {
    fs.writeFile(p, JSON.stringify(users), err => {
      if (err) reject(err);

      resolve(user);
    });
  });
};
const deleteById = async id => {
  const users = await getAll();
  const idx = users.findIndex(cur => cur.id !== id);
  const deleteUser = users[idx];
  users.splice(idx, 1);
  return new Promise((resolve, reject) => {
    fs.writeFile(p, JSON.stringify(users), err => {
      if (err) reject(err);

      resolve(deleteUser);
    });
  });
};

module.exports = { getAll, getById, createUser, updateById, deleteById };
