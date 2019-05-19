const path = process.cwd();
const User = require(`${path}/schemas/users.js`);
const Post = require(`${path}/schemas/posts.js`);
const {
  getUser
} = require(`${path}/models/users.js`);

const {
UserDoesNotHaveAPost,
FieldIsRequired,
UserNotFound,
PostDoesNotExist
} = require(`${path}/errors/errors.js`);

async function createPost(email, title, description) {
  try{
     let user = await User.getUser(email);
     let post = await Post.addPost(title, description);
     user.posts.push({_id: post._id});
     await user.updateForDeleteCreate(user.posts);
    }
    catch(err){
      if (err.message.includes('is required.'))
        throw new FieldIsRequired();
      }
      throw err;
    }
}

async function deletePost(email, post) {
    try{
      let user = await User.getUser(email);
      user.posts.pull(post);
      await user.updateForDeleteCreate(user.posts);
      await Post.deleteThePost(post);
    }
    catch(err){
      throw err;
    }
}

async function getPosts(){
  return await Post.getAllPosts();
}

async function getAllPostsOfTheUser(email){
  try {
    let posts = User.getAllPostsOfTheUser(email);
  } catch (err) {
      throw new UserNotFound();
  }
    if(posts)
      return posts;
    throw new UserDoesNotHaveAPost();
}
async function getRecentPosts(){
  return Post.getRecentPosts();
}

async function getPostByID(id){
  let post = Post.getPostByID(id);
  if(!post)
    throw new PostDoesNotExist();
  return post;
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
