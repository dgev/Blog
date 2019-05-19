class UserNotFound extends Error {
    constructor() {
      super('User is not found!');
    }
  }
  class UserAlreadyExists extends Error {
    constructor() {
      super('User already exists!');
    }
  }
  class PasswordIncorrect extends Error {
    constructor() {
      super('Invalid password!');
    }
  }
  class ValidationError extends Error {
    constructor() {
      super('Username is shorter than 4 characters!');
    }
  }
  class UserIsLocked extends Error {
    constructor() {
      super('Failed login!');
    }
  }
  class UserDoesNotHaveAPost extends Error{
  constructor() {
    super('The user does not possess the post!');
  }
}
class FieldIsRequired extends Error {
    constructor() {
      super('All fields are required to input!');
    }
  }

  class PostDoesNotExist extends Error {
      constructor() {
        super('The post does not exist!');
      }
    }
  module.exports = {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    ValidationError,
    UserIsLocked,
    UserDoesNotHaveAPost,
    FieldIsRequired,
    PostDoesNotExist
  }
