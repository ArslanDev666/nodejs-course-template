const router = require('express').Router();
const taskService = require('./task.service');
const morganTokens = require('../../common/morgan-tokens');
const logger = require('../../common/logger');

router.get('/:boardId/tasks', morganTokens.tasks, async (req, res) => {
  const { boardId } = req.params;
  try {
    const tasks = await taskService.getAllByBoardId(boardId);
    res.status(200).send(tasks);
  } catch (error) {
    logger.error(error.stack);
  }
});

router.get('/:boardId/tasks/:taskId', morganTokens.tasks, async (req, res) => {
  const { boardId, taskId } = req.params;
  try {
    const task = await taskService.getTaskById(boardId, taskId);
    if (task) {
      res.status(200).send(task);
    } else {
      res.status(404).send('not found');
      logger.log({
        level: 'error',
        message: `Method: ${req.method} - Status: 404 - Error: Task Not Found! - boardId: ${boardId} | taskId: ${taskId}, Url: ${req.originalUrl}\n`
      });
    }
  } catch (error) {
    logger.error(error.stack);
  }
});

router.post('/:boardId/tasks', morganTokens.tasks, async (req, res) => {
  const data = req.body;
  const { boardId } = req.params;
  try {
    const createTask = await taskService.createTask(data, boardId);
    res.status(200).send(createTask);
  } catch (error) {
    logger.error(error.stack);
  }
});

router.put('/:boardId/tasks/:taskId', morganTokens.tasks, async (req, res) => {
  const { boardId, taskId } = req.params;
  const data = req.body;
  try {
    const updateTask = await taskService.updateTaskById(boardId, taskId, data);
    if (updateTask) {
      res.status(200).send(updateTask);
    } else {
      res.status(404).send('not found');
      logger.log({
        level: 'error',
        message: `Method: ${req.method} - Status: 404 - Error: Task Not Found! - boardId: ${boardId} | taskId: ${taskId}, Url: ${req.originalUrl}\n`
      });
    }
  } catch (error) {
    logger.error(error.stack);
  }
});

router.delete(
  '/:boardId/tasks/:taskId',
  morganTokens.tasks,
  async (req, res) => {
    const { boardId, taskId } = req.params;
    try {
      await taskService.deleteTaskById(boardId, taskId);
      res.status(204).send('The task has been deleted');
    } catch (error) {
      res.status(404).send('Task not found');
      logger.log({
        level: 'error',
        message: `Method: ${req.method} - Status: 404 - Error: Task Not Found! - boardId: ${boardId} | taskId: ${taskId}, Url: ${req.originalUrl}\n`
      });
    }
  }
);

module.exports = router;
