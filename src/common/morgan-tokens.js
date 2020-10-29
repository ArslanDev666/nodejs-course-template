/* eslint-disable guard-for-in */
const morgan = require('morgan');
const logger = require('./logger');
const User = require('../resources/users/user.model');

// *helpers
function isEmpty(obj) {
  for (const key in obj) {
    return false;
  }
  return true;
}

morgan.token('getUser', req => {
  return `Method: ${req.method}, URL: ${req.originalUrl}, Body:${JSON.stringify(
    !isEmpty(req.body) && req.body.id ? User.toResponse(req.body) : req.body
  )}, Params:${JSON.stringify(req.params)}`;
});

morgan.token('getInfo', req => {
  return `Method: ${req.method}, URL: ${req.originalUrl}, Body:${JSON.stringify(
    req.body
  )}, Params:${JSON.stringify(req.params)}`;
});
const users = morgan(':getUser', { stream: logger.stream });
const board = morgan(':getInfo', { stream: logger.stream });
const tasks = morgan(':getInfo', { stream: logger.stream });
const login = morgan(':getInfo', { stream: logger.stream });

module.exports = { users, board, tasks, login };
