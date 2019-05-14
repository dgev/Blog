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

// PostSchema.statics.getAllPosts = function() {
//   return Post.find({});
// }


// PostSchema.statics.deletePost = function(post) {
//   Post.findByIdAndRemove(post);
// }
//
// PostSchema.statics.editPostTitle = function(post) {
//   this.update({
//     _id: post._id
//   }, {
//     title: this.title
//   }, function(err, affected, resp) {
//     console.log(affected);
//   });
// }
//
// PostSchema.statics.editPostDescription = function(post) {
//   this.update({
//     _id: post._id
//   }, {
//     title: this.description
//   }, function(err, affected, resp) {
//     console.log(affected);
//   });
// }

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
