// Define routes of /users/ api here

const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const path = process.cwd();
const {
  login,
  getUser,
  getAllUsers,
  createUser
} = require(`${path}/models/users.js`);

router.post('/users', async function(req, res, next) {

  try {
    await createUser(req.body);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
})

router.get('/users', async function(req, res, next) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
})

router.get('/UserByEmail', async function(req, res, next) {
  try {
    console.log(req.body.email);
    const user = await getUser(req.body.email);
    res.json(user);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
})

router.get('/login', async function(req, res, next) {
  try {

    const user = await login(req.query.email, req.query.password);
    res.json(user);
    res.status(200).end();
  } catch (err) {
    next(err)
  }
})


module.exports = router;
