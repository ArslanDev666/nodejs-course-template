const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = id => tasksRepo.getAllByBoardId(id);

const getTaskById = (boardId, taskId) => tasksRepo.getTaskById(boardId, taskId);

const createTask = (data, boardId) => tasksRepo.createTask(data, boardId);

const updateTaskById = (boardId, taskId, data) =>
  tasksRepo.updateTaskById(boardId, taskId, data);

const deleteTaskById = (boardId, taskId) =>
  tasksRepo.deleteTaskById(boardId, taskId);

const deleteUserId = userId => tasksRepo.deleteUserId(userId);
const deleteBoardId = boardId => tasksRepo.deleteBoardId(boardId);

module.exports = {
  getAllByBoardId,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
  deleteUserId,
  deleteBoardId
};
