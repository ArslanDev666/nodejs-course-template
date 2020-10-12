const boardRepo = require('./board.memory.repository');
const getAll = () => boardRepo.getAll();
const getById = id => boardRepo.getById(id);
const createBoard = data => boardRepo.createBoard(data);
const updateById = (id, data) => boardRepo.updateById(id, data);
const deleteById = id => boardRepo.deleteById(id);

module.exports = { getAll, getById, createBoard, updateById, deleteById };
