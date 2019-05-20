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
  UserIsLocked,
  UserDoesNotHaveAPost,
  FieldIsRequired,
  PostDoesNotExist
  } = require('./errors/errors.js');


app.use('/', require('./routes/users.js'));
app.use('/', require('./routes/posts.js'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/login.html'))
})

app.get('/login.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/login.html'))
})

app.get('/index.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})

app.get('/post.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})

app.get('/allPosts.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/allPosts.html'))
})

 const Post = require('./schemas/posts.js');

const post1 = new Post({
  title: 'Why we need creative educators',
  description: `
  Sir Ken Robinson, an international advisor on education, once interviewed Hans Zimmer, the Oscar winning German composer. Zimmer apparently was an unruly child at school. He was thrown out from 8 schools.
  When his parents took him to the ninth, the head teacher figured out how to get Zimmer involved in education just by talking to him. The head teacher organized for him to study music because Zimmer said he liked music. This led to his successful career.
  Not just Zimmer’s music but the teacher and her teaching method are also creative. This again is proof of the importance of creativity in educators. Zimmer was lucky as the head teacher was creative in her teaching methods.
  But in today’s greatly synchronized teaching environment there is little scope for creativity.
  During a recent experiment, a creative writing task was given to science and arts students. To everyone’s surprise, the science students performed much better than arts students. The experiment showed the value of creative thought for scientists in the workplace. What makes their organizations excel is the creativity and innovation of these scientists.
  Creativity in all of its forms should be embraced by educators if they want to nurture happy, well balanced students. The right kind of thinkers for future generations can be cultivated only through this method.
  “The principle goal of education should be to create people who are capable of doing new things, not simply of repeating what other generations have done-men who are creative, inventive, and discoverers.” – Jean Piaget
  Help students embrace this creativity is what educators should aim for. Let students give wings to the imagination without the fear of failure.
  “It is the supreme art of the teacher to awaken joy in creative expression and knowledge.” – Albert Einstein
  Teachers should become creative themselves if they want to instill creativity in their students, schools, and fellow educators.`,
  date: new Date()
});
  post1.save();

const post2 = new Post({
  title: 'Our brain and creativity',
  description: `
  When we are doing something creatively what is actually active in our brain? Researchers Siyuan Liu and Allen Braun did research on this topic by tracking the brain activity of freestyle rappers.
  It turns out that the parts of the brain that we use in ‘business as usual’ thinking are totally switched off when we are being creative, whereas other parts of our mind that we do not use everyday are quite active.
  The medial prefrontal cortex showed increased activity during improvisation and lower activity in the dorsolateral prefrontal cortex.
  Braun found that during creative expression, ‘executive functions’ take a back seat and more uncensored processes and de-focused attention happen.
  George Land’s Creativity Test
  George Land conducted a research study in 1968. What the test shows is that non-creative behavior is learned.
  Land did a creativity test on children in the age group 3 to 5. This was the same test he conducted to select scientists and innovative engineers for NASA. He tested the same children at 10 years of age, and again at 15 years of age. The results were shocking.
  While the creativity in 5 year olds was 98%, it went down to 30% when they reached the age of 10. And it was just 12% when they were tested as 15 year olders.
  When the same test was given to 280,000 adults, the creativity was just 2%.`,
  date: new Date()
});
  post2.save();

  const post3 = new Post({
    title: "What is Creativity?",
    description: `Research shows that everybody is creative
    In school, those who can write a good story or draw beautiful pictures are considered the special ones who are creative. But research shows that all people are creative.
    In fact, creativity is one of the most important characteristics of being human. It is one of the main traits that make us successful as individuals and as a species.
    Our workshops don’t merely talk about being creative—we spend our class time actively getting people to jump in and do creative work. We have found in our 25 years of teaching The Creativity Workshop that if we let our hand move faster than our brain, the hurdles to creativity disappear.
    The astonishing thing is how easy it is with the right techniques to get people who think they have no creativity at all to do very innovative and imaginative work.
    An ideal environment for teaching creativity includes exercises and techniques that are supportive, playful, surprising, and value process over product.
    In case you have doubts about your own creativity there are scientific studies to prove it. American neurologist Alice Flaherty in her book The Midnight Disease, talks about the neural basis of creativity:
    “A creative idea will be defined simply as one that is both novel and useful (or influential) in a particular social setting.”
    Flaherty says that this applies to business, IT, science and math as much as it does to what we typically think of as “creative” fields, such as fiction writing, art or theatre.`,
    date: new Date()
  });
    post3.save();

app.use(function(err, req, res, next) {
    if (err.message === new UserNotFound().message) {
      res.send(new UserNotFound().message);
      res.status(404).end();
    } if (err.message === new PasswordIncorrect().message) {
      res.send(new PasswordIncorrect().message)
      res.status(401).end();
    }  if (err.message === new ValidationError().message) {
      res.send(new ValidationError().message)
      res.status(400).end();
    }  if (err.message === new UserAlreadyExists().message) {
      res.send(new UserAlreadyExists().message)
      res.status(409).end();
    }  if (err.message === new UserIsLocked().message) {
      res.send(new UserIsLocked().message)
      res.status(423).end();
    }  if (err.message === new UserDoesNotHaveAPost().message) {
      res.send(new UserDoesNotHaveAPost().message)
      res.status(404).end();
    }  if (err.message === new FieldIsRequired().message) {
      res.send(new FieldIsRequired().message)
      res.status(400).end();
    }  if (err.message === new PostDoesNotExist().message) {
      res.send(new PostDoesNotExist().message)
      res.status(404).end();
    }
    console.error(err.stack)
    res.status(500).end();

      // if(err.message === new UserNotFound().message){
      //   res.status(404).send(err.message);
      //   }
      // if(err.message === new UserIsLocked().message){
      //   res.status(423).send(err.message);
      //   }
      // if(err.message === new UserAlreadyExists().message){
      //   res.status(409).send(err.message);
      //   }
      // if(err.message === new PasswordIncorrect().message){
      //   res.status(401).send(err.message);
      // }
      // if(err.message === new ValidationError().message){
      //   res.status(400).send(err.message);
      // }
      // console.error(err.stack);
      // res.status(500).end();

  })


  app.use(function(req, res, next) {
      res.status(404).send('page was not found!!');
  })



app.listen(3000, () => {

    console.log('App is listening to port 3000');

})
