const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Models
const db = require('./models/db');
const Sign = require('./models/signs');

// set the view engine to ejs
app.set('view engine', 'ejs');

// Set assets
app.use('/assets', express.static('assets'))

// Body Parser for forms
app.use(bodyParser.urlencoded({ extended: true }))

// Setting local port
app.set('port', (process.env.PORT || 5000));

// Index
app.get('/', (req, res) => {
  Sign.find()
    .then(signs => {
      res.render(`pages/index`, { signs });      
    })
    .catch(error => {
      console.log('Error finding list of signs')
    });
});

// Post
app.post('/signs', (req, res) => {
  const newSign = Sign(req.body);

  newSign.save()
    .then(sign => {
      res.redirect('/')
    }).catch(error => {
      console.log('Error saving sign')
    })
});

// About
app.get('/about', (req, res) => {
  res.render('pages/about')
});

// Sign
app.get('/sign', (req, res) => {
  res.render('pages/sign')
});

// Sign
app.get('/create', (req, res) => {
  res.render('pages/create')
});

// Thank-you
app.get('/thank-you', (req, res) => {
  res.render('pages/thank-you')
});


// Listening to port
app.listen(app.get('port'), function() {
  console.log('Server running on', app.get('port'));
});