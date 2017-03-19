const mongoose = require('mongoose');  

const signSchema = new mongoose.Schema({  
  name: { type: String, required: true },
  url: String,
  sign: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  featured: {type: Boolean, default: false }
});

const Sign = mongoose.model('Sign', signSchema);

module.exports = Sign;