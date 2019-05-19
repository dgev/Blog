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

async function updatePostTitle(id, title) {
  (await Post.getPostByID(id)).updateTitle(title);
}

async function updatePostDescription(id, description) {
  (await Post.getPostByID(id)).updateDescription(description);
}

module.exports = {
  createPost,
  getPosts,
  getAllPostsOfTheUser,
  getRecentPosts,
  getPostByID,
  deletePost,
  updatePostTitle,
  updatePostDescription
}
