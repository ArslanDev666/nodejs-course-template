const uuid = require('uuid');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  toJSON() {
    return {
      name: this.name,
      id: this.id,
      login: this.login,
      password: this.password
    };
  }
}

module.exports = User;
