/* eslint-disable no-unused-vars */
const express = require('express');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/board/board.router');
const taskRouter = require('./resources/task/task.router');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const logger = require('./common/logger');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

// check 500 status error
// app.get('/error', (req, res) => res.send(error()));

app.use((req, res) => {
  logger.error(`${404} - Page not Found - ${req.originalUrl} - ${req.method}`);
  res.status(404).send('404! See errors on log file');
});

app.use((err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method}`
  );
  res.status(err.status || 500).send('Something broke! See errors on log file');
});

process.on('unhandledRejection', (reason, err) => {
  console.error('Unhandled Rejection at Promise \n', err);
  logger.error(`UnhandledRejection: ${reason.stack}`);
});
process.on('uncaughtException', err => {
  console.error(err.stack);
});

// PUT IT HERE
// throw new Error('Oops!');
// PUT IT HERE
// Promise.reject(Error('Oops!'));

module.exports = app;
