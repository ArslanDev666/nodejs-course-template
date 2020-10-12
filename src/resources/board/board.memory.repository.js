/* eslint-disable no-sync */
const Board = require('./board.model');
const DB = require('../../data/DB').boards;

const getAll = async () => DB;

const getById = async id => DB.find(cur => cur.id === id);

const createBoard = async data => {
  const board = new Board(data).toJSON();

  DB.push(board);
  return getById(board.id);
};

const updateById = async (id, board) => {
  const idx = DB.findIndex(cur => cur.id === id);
  DB[idx] = { ...board };
  return getById(id);
};

const deleteById = async id => {
  const idx = DB.findIndex(cur => cur.id === id);
  return DB.splice(idx, 1);
};

module.exports = { getAll, getById, createBoard, updateById, deleteById };
