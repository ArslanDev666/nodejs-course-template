const { Schema, model } = require('mongoose');

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

User.statics.toResponse = user => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
};

module.exports = model('User', User);
