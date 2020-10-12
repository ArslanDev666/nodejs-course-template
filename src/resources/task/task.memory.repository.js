/* eslint-disable no-sync */
const DB = require('../../data/DB').tasks;

const Task = require('./task.model');

const getAllByBoardId = boardId => DB.filter(task => task.boardId === boardId);

const createTask = async (data, boardId) => {
  const task = new Task(data).toJSON();
  task.boardId = boardId;
  DB.push(task);
  return task;
};

const getTaskById = async (boardId, taskId) =>
  DB.filter(task => task.boardId === boardId).find(task => task.id === taskId);

const updateTaskById = async (boardId, taskId, data) => {
  const updateTaskIdx = DB.findIndex(
    task => task.id === taskId && task.boardId === boardId
  );
  DB[updateTaskIdx] = { ...data };

  return DB[updateTaskIdx];
};

const deleteTaskById = async (boardId, taskId) => {
  const idx = DB.findIndex(task => task.id === taskId);
  DB.splice(idx, 1);
};

const deleteUserId = async userId =>
  DB.map(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
    return task;
  });

const deleteBoardId = async boardId => {
  const deleteItems = [];
  DB.forEach(task => {
    if (task.boardId === boardId) {
      deleteItems.push(task);
    }
  });
  deleteItems.forEach(item => {
    const idx = DB.findIndex(task => task.id === item.id);
    DB.splice(idx, 1);
  });
};

module.exports = {
  getAllByBoardId,
  createTask,
  getTaskById,
  deleteTaskById,
  updateTaskById,
  deleteUserId,
  deleteBoardId
};
