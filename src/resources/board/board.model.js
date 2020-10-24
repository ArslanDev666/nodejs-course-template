const { Schema, model } = require('mongoose');

const Board = new Schema({
  title: {
    type: String,
    required: true
  },
  columns: [
    {
      title: String,
      order: Number
    }
  ]
});

Board.statics.toResponse = ({ _id, title, columns }) => {
  return { id: _id, title, columns };
};

module.exports = model('Board', Board);
