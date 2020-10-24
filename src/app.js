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

app.use((req, res) => {
  logger.error(`${404} - Page not Found - ${req.originalUrl} - ${req.method}`);
  res.status(404).send('404! See errors on log file');
});

// eslint-disable-next-line no-unused-vars
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

module.exports = app;
