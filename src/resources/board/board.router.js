const router = require('express').Router();
const boardService = require('./board.service');
const taskService = require('../task/task.service');

router.get('/', async (req, res) => {
  const boards = await boardService.getAll();
  res.send(boards);
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const board = await boardService.getById(id);
  if (board) {
    res.status(200).send(board);
  } else {
    res.status(404).send('Not Found');
  }
});
router.post('/', async (req, res) => {
  const data = req.body;
  const board = await boardService.createBoard(data);

  res.send(board);
});
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const board = await boardService.updateById(id, data);
  res.send(board);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await boardService.deleteById(id);
    await taskService.deleteBoardId(id);
    res.status(204).json('The board has been deleted');
  } catch (err) {
    res.status(404).send('Board not found');
  }
});

module.exports = router;
