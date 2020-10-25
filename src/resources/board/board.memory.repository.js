/* eslint-disable no-sync */
const Board = require('./board.model');

const getAll = async () => Board.find();

const getById = async id => Board.findById(id);

const createBoard = async data => {
  const board = new Board(data);
  await board.save();
  return getById(board._id);
};

const updateById = async (id, board) => {
  await Board.findByIdAndUpdate(id, board);
  return getById(id);
};

const deleteById = async id => Board.findByIdAndDelete(id);

module.exports = { getAll, getById, createBoard, updateById, deleteById };
