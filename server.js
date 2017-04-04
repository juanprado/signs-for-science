const express = require('express');
const bodyParser = require('body-parser');
const sanitizer = require('express-sanitizer');
const app = express();
const aws = require('aws-sdk');
const uuidV4 = require('uuid/v4');

//S3 bucket
const S3_BUCKET = process.env.S3_BUCKET;

// Models
const db = require('./models/db');
const Sign = require('./models/signs');

// set the view engine to ejs
app.set('view engine', 'ejs');

// Set assets
app.use('/assets', express.static('assets'))

// Body Parser for forms
app.use(bodyParser.urlencoded({ extended: true }))
app.use(sanitizer());

// Setting local port
app.set('port', (process.env.PORT || 5000));

// Index
app.get('/', (req, res) => {
  const limit = 12;

  Sign.find()
    .sort({ featured: -1 })
    .limit(limit)
    .then(signs => { res.render(`pages/index`, { signs }); })
    .catch(error => { console.log('Error finding list of signs') });
});

//Ajax pagination
app.get('/get-signs', (req, res) => {
  const page = req.query.page || 0;
  const limit = 12;
  const skip = page * limit;

  Sign.find()
    .sort({ featured: -1 })
    .skip(skip)
    .limit(limit)
    .then(signs => { res.render('partials/sign-list', { signs }); })
    .catch(error => { res.send(JSON.stringify({ error })); })
});

// Post
app.post('/signs', (req, res) => {
  const signObj = req.body;

  delete signObj['file'];
  delete signObj['sign-type'];
  signObj.sign = req.sanitize(req.body.sign);
  Sign(signObj).save()
    .then(sign => { res.redirect(`/thank-you?slug=${sign.slug}`) })
    .catch(error => { console.log('Error saving sign') })
});


// Image Signature
app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3({ region: 'us-east-2', signatureVersion: 'v4' });
  const name = req.query['file-name'];
  const fileType = req.query['file-type'];
  const uuid = uuidV4();
  const fileName = `${uuid}-${name}`;
  
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }

    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    res.send(JSON.stringify(returnData));
  });
});

// Sign
app.get('/sign/:slug', (req, res) => {
  const slug = req.params.slug;

  Sign.findOne({ slug })
    .then(sign => { res.render('pages/sign', { sign }); })
    .catch(error => { console.log('is this an error?') })
});

// About
app.get('/about', (req, res) => {
  res.render('pages/about')
});

// Sign
app.get('/create', (req, res) => {
  res.render('pages/create')
});

// Thank-you
app.get('/thank-you', (req, res) => {
  const slug = req.query.slug;

  Sign.findOne({ slug })
    .then(sign => { res.render('pages/thank-you', { sign }); })
    .catch(error => { console.log('is this an error?') })
});

// Listening to port
app.listen(app.get('port'), function() {
  console.log('Server running on', app.get('port'));
});