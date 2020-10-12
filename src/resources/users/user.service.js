const usersRepo = require('./user.memory.repository');

const getAll = async () => usersRepo.getAll();
const getById = async id => usersRepo.getById(id);
const createUser = async data => usersRepo.createUser(data);
const updateById = async (id, data) => usersRepo.updateById(id, data);
const deleteById = async id => usersRepo.deleteById(id);

module.exports = { getAll, getById, createUser, updateById, deleteById };
