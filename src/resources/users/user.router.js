const router = require('express').Router();
const taskService = require('../task/task.service');
const User = require('./user.model');
const usersService = require('./user.service');
const morganTokens = require('../../common/morgan-tokens');
const logger = require('../../common/logger');
const authenticateJWT = require('../../common/authenticateJWT');

router.get('/', morganTokens.users, authenticateJWT, async (req, res) => {
  try {
    const users = await usersService.getAll();

    if (users.length > 0) {
      res.status(200).send(users.map(item => User.toResponse(item)));
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    logger.error(error.stack);
    res.status(500).send('wrong error');
  }
});

router.get('/:id', morganTokens.users, authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersService.getById(id);
    if (user) {
      res.status(200).send(User.toResponse(user));
    } else {
      res.status(404).send('Not Found');
      logger.log({
        level: 'error',
        message: `Method: ${req.method} - Status: 404 - Error: User Not Found! - id: ${id}, Url: ${req.originalUrl}\n`
      });
    }
  } catch (error) {
    logger.error(error.stack);
    res.status(500).send('wrong error');
  }
});

router.post('/', morganTokens.users, authenticateJWT, async (req, res) => {
  try {
    const data = req.body;
    const user = await usersService.createUser(data);
    res.status(200).send(User.toResponse(user));
  } catch (error) {
    logger.error(error.stack);
    res.status(500).send('wrong error');
  }
});

router.put('/:id', morganTokens.users, authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const user = await usersService.updateById(id, data);
    if (user) {
      res.status(200).send(User.toResponse(user));
    } else {
      res.status(404).send('Not Found');
      logger.log({
        level: 'error',
        message: `Method: ${req.method} - Status: 404 - Error: User Not Found! - id: ${id}, Url: ${req.originalUrl}\n`
      });
    }
  } catch (error) {
    logger.error(error.stack);
    res.status(500).send('wrong error');
  }
});

router.delete('/:id', morganTokens.users, authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    await usersService.deleteById(id);
    await taskService.deleteUserId(id);
    res.status(204).send('delete complete');
  } catch (error) {
    res.status(404).send('User not found');
    logger.log({
      level: 'error',
      message: `Method: ${req.method} - Status: 404 - Error: User Not Found! - id: ${id}, Url: ${req.originalUrl}\n`
    });
  }
});

module.exports = router;
