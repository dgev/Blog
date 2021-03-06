// Define routes of /users/ api here

const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const path = process.cwd();
const {
  deletePost,
  createPost,
  getPosts,
  getAllPostsOfTheUser,
  getRecentPosts,
  getPostByID,
  updatePost
} = require(`${path}/models/posts.js`);

router.post('/posts', async function(req, res, next) {

  try {
    res.send(await createPost(req.body.email, req.body.title, req.body.description));
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

  res.send((await getAllPostsOfTheUser(req.query.email)).posts);
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
 try{
  res.send(await getPostByID(req.query._id));
  res.status(200).end();
  }
  catch (err) {
    next(err);
  }
})

router.post('/deletePost', async function(req, res, next) {

  try {
   await deletePost(req.body.email, req.body._id);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
})

router.post('/updateTitleDesciption', async function(req, res, next) {

  try {
    res.send(await updatePost(req.body._id, req.body.title, req.body.description));
    res.status(200).end();
  } catch (err) {
    next(err);
  }
})


module.exports = router;
