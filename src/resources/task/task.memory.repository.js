/* eslint-disable no-sync */
const Task = require('./task.model');

const getAllByBoardId = async boardId => Task.find({ boardId });

const createTask = async (data, boardId) => {
  const task = new Task(data);
  task.boardId = boardId;
  await task.save();
  return task;
};

const getTaskById = async (boardId, taskId) => {
  const tasks = await Task.find({ boardId }).lean();
  return tasks.filter(item => item._id.toString() === taskId)[0];
};

const updateTaskById = async (boardId, taskId, data) => {
  await Task.findByIdAndUpdate(taskId, data);
  return getTaskById(boardId, taskId);
};

const deleteTaskById = async (boardId, taskId) =>
  Task.findByIdAndDelete(taskId);

const deleteUserId = async userId =>
  Task.updateMany({ userId }, { $set: { userId: null } });

const deleteBoardId = async boardId => Task.deleteMany({ boardId });

module.exports = {
  getAllByBoardId,
  createTask,
  getTaskById,
  deleteTaskById,
  updateTaskById,
  deleteUserId,
  deleteBoardId
};
