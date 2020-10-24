const { Schema, model } = require('mongoose');

const Task = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId
  },
  boardId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  columnId: {
    type: Schema.Types.ObjectId
  },
  order: {
    type: Number,
    required: true
  }
});

Task.statics.toResponse = ({
  _id,
  title,
  description,
  userId,
  boardId,
  columnId,
  order
}) => {
  return { id: _id, title, description, userId, boardId, columnId, order };
};

module.exports = model('Task', Task);
