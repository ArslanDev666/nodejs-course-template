const uuid = require('uuid');
class Task {
  constructor({
    id = uuid(),
    title = 'title',
    description = 'description',
    userId = 'userId',
    order = 0,
    boardId = 'string',
    columnId = 'string'
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.order = order;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      userId: this.userId,
      order: this.order,
      boardId: this.boardId,
      columnId: this.columnId
    };
  }
}

module.exports = Task;
