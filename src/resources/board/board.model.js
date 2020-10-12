const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'string', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      columns: this.columns
    };
  }
}

module.exports = Board;
