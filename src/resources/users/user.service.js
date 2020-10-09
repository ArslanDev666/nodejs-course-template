const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const createUser = data => usersRepo.createUser(data);
const updateById = (id, data) => usersRepo.updateById(id, data);
const deleteById = id => usersRepo.deleteById(id);

module.exports = { getAll, getById, createUser, updateById, deleteById };
