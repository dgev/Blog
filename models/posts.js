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
  console.log(description);
  try{
     let user = await User.getUserByEmail(email);
     console.log(user);
     if(!user)
      throw new UserNotFound();
     let post =  await new Post({
     title: title,
     description: description,
     date: new Date()
      });
     await post.save();
     console.log(post);
     user.posts.push({_id: post._id});
     await user.updateForDeleteCreate(user.posts);
     return post;
   }
    catch(err){
      if (err.message.includes('is required.'))
       throw new FieldIsRequired();
      if (err.message === new UserNotFound().message)
        throw new UserNotFound();
    }
}

async function deletePost(email, post) {
    try{
      let user = await getUser(email);
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
  try{
    let user = await getUser(email);
    console.log(user);
    let posts = await user.getAllPostsOfTheUser();
    if(posts.posts)
      return posts;
     throw new UserDoesNotHaveAPost();
  }
 catch (err) {
    if(err.message == new UserDoesNotHaveAPost().message)
      throw new UserDoesNotHaveAPost();
    throw new UserNotFound();
   }
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
