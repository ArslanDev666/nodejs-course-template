const router = require('express').Router();
const taskService = require('./task.service');

router.get('/:boardId/tasks', async (req, res) => {
  const { boardId } = req.params;
  const tasks = await taskService.getAllByBoardId(boardId);
  res.status(200).send(tasks);
});

router.get('/:boardId/tasks/:taskId', async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await taskService.getTaskById(boardId, taskId);
  if (task) {
    res.status(200).send(task);
  } else {
    res.status(404).send('not found');
  }
});

router.post('/:boardId/tasks', async (req, res) => {
  const data = req.body;
  const { boardId } = req.params;

  const createTask = await taskService.createTask(data, boardId);
  res.send(createTask);
});

router.put('/:boardId/tasks/:taskId', async (req, res) => {
  const { boardId, taskId } = req.params;
  const data = req.body;
  const updateTask = await taskService.updateTaskById(boardId, taskId, data);

  res.send(updateTask);
});

router.delete('/:boardId/tasks/:taskId', async (req, res) => {
  const { boardId, taskId } = req.params;
  await taskService.deleteTaskById(boardId, taskId);
  res.status(204).send('The board has been deleted');
});

module.exports = router;
