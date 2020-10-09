const express = require('express');
const userRouter = require('./resources/users/user.router');
const docRouter = require('./resources/doc/doc.router');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/doc', docRouter);
app.use('/users', userRouter);

module.exports = app;
