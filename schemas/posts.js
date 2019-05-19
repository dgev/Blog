const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    date: Date
});

PostSchema.statics.addPost = function(title, description) {
    let post = new Post({
    title: title,
    description: description,
    date: new Date()
  });
    //console.log(post);
    post.save();
    return post;
}

PostSchema.statics.getAllPosts = function() {
  return Post.find({});
}

PostSchema.statics.getRecentPosts = function() {
 return Post.find({}).sort({ date: -1 }).limit(3);
}

PostSchema.statics.getPostByID = function(id) {
  return Post.findOne({_id : id});
}

PostSchema.statics.deleteThePost = function(id) {
    Post.deleteMany({_id: id}, function(err, affected, resp) {
      console.log(affected);
    });
}
PostSchema.methods.updateTitle = function(title) {
  Post.update({
    _id: this._id
  }, {
    title: title
  }, function(err, affected, resp) {
    console.log(affected);
  });
}

PostSchema.methods.updateDescription = function(description) {
  Post.update({
    _id: this._id
  }, {
    description: description
  }, function(err, affected, resp) {
    console.log(affected);
  });
}

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;