class UserNotFound extends Error {
    constructor() {
      super('user is not found');
    }
  }
  class UserAlreadyExists extends Error {
    constructor() {
      super('user already exists!');
    }
  }
  class PasswordIncorrect extends Error {
    constructor() {
      super('Invalid password!');
    }
  }
  class ValidationError extends Error {
    constructor() {
      super('Username is shorter than 4 characters');
    }
  }
  class UserIsLocked extends Error {
    constructor() {
      super('failed login!');
    }
  }
  
  module.exports = {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    ValidationError,
    UserIsLocked
  }
  