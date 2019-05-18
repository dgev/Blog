const path = process.cwd();
const User = require(`${path}/schemas/users.js`);
const Post = require(`${path}/schemas/posts.js`);
const {
  getUser
} = require(`${path}/models/users.js`);

const {
UserDoesNotHaveAPost
} = require(`${path}/errors/errors.js`);

async function createPost(email, title, description) {
  let user = await User.getUserByEmail(email);
<<<<<<< HEAD
  console.log(user);
  let post = await Post.addPost(title, description);
   user.posts.push(post._id);
   //console.log(user.posts);
  User.update({
     email: email
   },{
     posts: user.posts
   }, function(err, affected, resp) {
     console.log(affected);
   });
   console.log(user.posts);
  }

async function deletePost(post) {
      await Post.deleteThePost(post);
    }

=======
  let post = await Post.addPost(title, description);
  user.posts.push({_id: post._id});
  await user.updateForDeleteCreate(user.posts);
}

async function deletePost(email, post) {
      let user = await User.getUserByEmail(email);
      user.posts.pull(post);
      await user.updateForDeleteCreate(user.posts);
      await Post.deleteThePost(post);
}
>>>>>>> origin/master

async function getPosts(){
  return await Post.getAllPosts();
}

async function getAllPostsOfTheUser(email){
  let posts = User.getAllPostsOfTheUser(email);
  if(posts)
  return posts;
  throw new UserDoesNotHaveAPost();
}
async function getRecentPosts(){
  return Post.getRecentPosts();
}

async function getPostByID(id){
  return Post.getPostByID(id);
}

<<<<<<< HEAD

  // async function updatePostTitle(post) {
  //   let user = await User.getUserByEmail(post.email);
  //    let post = user.posts.findOne({_id: post._id});
  //    Post.updatePostTitle(post);
  //    console.log(post);
  //     User.update({
  //      email: email
  //    },{
  //      posts: user.posts
  //    }, function(err, affected, resp) {
  //      console.log(affected);
  //    });
  //    console.log(user.posts);
  //   }
  //
  // async function deletePost(email, post) {
  //   let user = await getUser(email);
  //   let index = user.posts.findIndex(p => p.split(':')[1].split(',')[0].trim() == post);
  //     if(index<0){
  //       throw new UserDoesNotHaveAPost();
  //       //console.log(user);
  //       //console.log(post);
  //     }
  //     console.log("I am into if statement");
  //     Post.deletePost(post);
  //   //  User.deleteUserPost(user, post, index);
  //   // Call corresponding schema function to retrieve the user and return the result.
  //   // if the user is not found, throw UserNotFound error.
  // }
=======
async function updatePostTitle(id, title) {
  (await Post.getPostByID(id)).updateTitle(title);
}

async function updatePostDescription(id, description) {
  (await Post.getPostByID(id)).updateDescription(description);
}

>>>>>>> origin/master
module.exports = {
  createPost,
  getPosts,
  getAllPostsOfTheUser,
  getRecentPosts,
  getPostByID,
<<<<<<< HEAD
  deletePost
  //updatePostTitle
=======
  deletePost,
  updatePostTitle,
  updatePostDescription
>>>>>>> origin/master
}
