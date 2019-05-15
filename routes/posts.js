// Define routes of /users/ api here

const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const path = process.cwd();
const {
  //deletePost,
  createPost,
  getPosts,
  getAllPostsOfTheUser,
  getRecentPosts,
  getPostByID
  //updatePostTitle
} = require(`${path}/models/posts.js`);
// const {
//   updatePostTitle
// } = require(`${path}/models/users.js`);

router.post('/posts', async function(req, res, next) {

  try {
    await createPost(req.body.email, req.body.title, req.body.description);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
})

router.get('/posts', async function(req, res, next) {
  try{
  res.send(await getPosts());
  res.status(200).end();
  }
  catch (err) {
    next(err);
  }
})

router.get('/postsByEmail', async function(req, res, next) {
  try{
  res.send((await getAllPostsOfTheUser(req.body.email)).posts);
  res.status(200).end();
  }
  catch (err) {
    next(err);
  }
})

router.get('/postsRecent', async function(req, res, next) {
  try{   
  res.send(await getRecentPosts());
  res.status(200).end();
  }
  catch (err) {
    next(err);
  }
})

router.get('/postByID', async function(req, res, next) {
  console.log(req.body);  
  try{   
  res.send(await getPostByID(req.body._id));
  res.status(200).end();
  }
  catch (err) {
    next(err);
  }
})

//
// router.post('/deletePost', async function(req, res, next) {
//
//   try {
//   //  console.log(req.body);
//     await deletePost(req.body.email, req.body._id);
//     res.status(200).end();
//   } catch (err) {
//     next(err);
//   }
// })
//
// router.post('/updateTitle', async function(req, res, next) {
//
//   try {
//   //  console.log(req.body);
//     await updatePostTitle(req.body);
//     res.status(200).end();
//   } catch (err) {
//     next(err);
//   }
// })

//
// router.get('/users', async function(req, res, next) {
//   try {
//     const users = await getAllUsers();
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// })

// router.get('/users/:email', async function(req, res, next) {
//   try {
//     const user = await getUser(req.params.email);
//     res.json(user);
//     res.status(200).end();
//   } catch (err) {
//     console.log(err.message);
//     next(err);
//   }
// })

// router.get('/login', async function(req, res, next) {
//   try {
//
//     const user = await login(req.query.email, req.query.password);
//     res.json(user);
//     res.status(200).end();
//   } catch (err) {
//     next(err)
//   }
// })


module.exports = router;
