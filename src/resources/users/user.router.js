const router = require('express').Router();
const taskService = require('../task/task.service');
const User = require('./user.model');
const usersService = require('./user.service');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);
  res.json(User.toResponse(user));
});

router.post('/', async (req, res) => {
  const data = req.body;
  const user = await usersService.createUser(data);

  res.json(User.toResponse(user));
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const user = await usersService.updateById(id, data);

  res.json(User.toResponse(user));
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await usersService.deleteById(id);
  await taskService.deleteUserId(id);
  res.json('delete complete');
});

module.exports = router;
