const mongoose = require('mongoose');
const pbkdf2 = require('pbkdf2');
const Post = require('./posts.js');



const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  failedLoginCount: Number,
  locked: Number,
  posts: [{
    type: 'ObjectId',
    ref: Post
  }]
});

UserSchema.pre('save', function(next) {
  this.password = pbkdf2.pbkdf2Sync(this.password, 'salt', 1, 32, 'sha512').toString('hex');
  next();
});

UserSchema.statics.getUserByEmail = function(email) {
 return User.findOne({
    email
  }, {
    password: false
  });
}

UserSchema.statics.getUsers = function(filter) {
  return User.find(filter, {
    password: false
  });
}

UserSchema.methods.comparePassword = function(password) {

  return this.password === pbkdf2.pbkdf2Sync(password, 'salt', 1, 32, 'sha512').toString('hex');
}

UserSchema.statics.ﬁndUserForLogin = function(email) {
  return user = User.findOne({
    email: email
  }, {
    _id: false
  });
}

UserSchema.statics.lockUser = function(user) {
  User.update({
    locked: user.locked
  }, {
    locked: 1
  }, function(err, affected, resp) {
    console.log(affected);
  });
}

UserSchema.statics.failed = function(user) {
  User.update({
    email: user.email
  }, {
    failedLoginCount: user.failedLoginCount + 1
  }, function(err, affected, resp) {
    console.log(affected);
  });
}

UserSchema.statics.deleteLoginCount = function(user) {
  User.update({
    email: user.email
  }, {
    failedLoginCount: 0
  }, function(err, affected, resp) {
    console.log(affected);
  });
}

UserSchema.methods.getAllPostsOfTheUser = function(email) {
  return User.findOne({
    email: this.email
  }).populate('posts');
}

UserSchema.methods.updateForDeleteCreate = function(posts) {
  User.update({
    email: this.email
  }, {
    posts: posts
  }, function(err, affected, resp) {
    console.log(affected);
  });
}

const User = mongoose.model('User', UserSchema);


module.exports = User;
