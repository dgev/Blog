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
      let user = await User.getUserByEmail(email);
      if(!user)
       throw new UserNotFound();
      user.posts.pull(post);
      await user.updateForDeleteCreate(user.posts);
      await Post.deleteThePost(post);
}

async function getPosts(){
  return await Post.getAllPosts();
}

async function getAllPostsOfTheUser(email){
    let user = await User.getUserByEmail(email);
    if(!user)
     throw new UserNotFound();
    let posts = await user.getAllPostsOfTheUser();
    if(posts.posts)
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
  let post = await Post.getPostByID(id);
  if(!post)
    throw new PostDoesNotExist();
  if(!title)
    throw new FieldIsRequired();
  post.updateTitle(title);
  return post;
}

async function updatePostDescription(id, description) {
  let post = await Post.getPostByID(id);
  if(!post)
    throw new PostDoesNotExist();
  if(!description)
    throw new FieldIsRequired();
  post.updateDescription(description);
  return post;
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
