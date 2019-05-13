const express = require('express')

const path = require('path')

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'))


const {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    ValidationError,
    UserIsLocked
  } = require('./errors/errors.js');
  

app.use('/', require('./routes/users.js'));

//const multer = require('multer');

//const upload = multer({dest: 'posts/'});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/login.html'))
})

app.get('/login.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/login.html'))
})

app.get('/index.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})

app.use(function(err, req, res, next) {
    if (err.message === new UserNotFound().message) {
      res.status(404).send('User with that username was not found!');
    } else if (err.message === new PasswordIncorrect().message) {
      res.status(401).send('Invalid password!!!')
    } else if (err.message === new ValidationError().message) {
      res.status(400).send('Username must contain at least 4 characters!')
    } else if (err.message === new UserAlreadyExists().message) {
      res.status(409).send('User with that username or email already exists!')
    } else if (err.message === new UserIsLocked().message) {
      res.status(423).send('The number of trials exceeded!')
    }else {
      console.log(err);
      res.status(500).send('something went wrong');
    }
    // This method will catch errors thrown in the application automatically.
    // Check the error type and return the corresponding error code.
  
    // If the error is not known
    console.error(err.stack)
    res.status(500).end();
  })
 




app.listen(3000, () => {

    console.log('App is listening to port 3000');
    
})