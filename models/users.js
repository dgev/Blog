// Create your main application logic here.
const path = process.cwd();
const User = require(`${path}/schemas/users.js`);

const {
  UserNotFound,
  UserAlreadyExists,
  PasswordIncorrect,
  ValidationError,
  UserIsLocked
} = require(`${path}/errors/errors.js`);

const maximum_allowed_wrong_passwords = process.env.maximum_allowed_wrong_passwords || 3;


async function login(email, password) {

  const user = await User.ﬁndUserForLogin(email);

  if (user === null || user.length === 0) {
    throw new UserNotFound();
  }
  const result = await user.comparePassword(password);

  if (user.locked) {
    throw new UserIsLocked();
  }
  if (!result) {
    user.failedLoginCount = user.failedLoginCount || 0;
    await User.failed(user);
    if (user.failedLoginCount >= maximum_allowed_wrong_passwords) {
      await User.lockUser(user);
      await User.deleteLoginCount(user);
      throw new UserIsLocked();
    }
    throw new PasswordIncorrect();
  }
  await User.deleteLoginCount(user);
  return user;
}

async function getUser(email) {
  const user = await User.getUserByEmail(email);
  if (user.length === 0 || user === null) {
    throw new UserNotFound();
  }
  return user;

  // Call corresponding schema function to retrieve the user and return the result.
  // if the user is not found, throw UserNotFound error.
}

async function getAllUsers() {
    return await User.getUsers({});
  }

async function createUser(body) {

  try {
    console.log(body.password);

    const user = await new User({
      email: body.email,
      firstName: body.name,
      lastName: body.lastName,
      password: body.password,
      posts: [],
      failedLoginCount: 0,
      locked: 0
    });
    await user.save();
  } catch (err) {
    if (err.message.includes('Invalid email!')) {
      throw new ValidationError();
    } else if (err.message.includes('duplicate key')) {
      throw new UserAlreadyExists();
    }
    throw err;
  }
  // Call corresponding schema function to create a user.
  // If the user already exists mongoose should throw an error.
  // Catch that error here and throw UserAlreadyExists error instead.
}

module.exports = {
  login,
  getUser,
  getAllUsers,
  createUser
}
