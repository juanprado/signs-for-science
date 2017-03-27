const mongoose = require('mongoose');  
const slug = require('mongoose-slug-generator');

//Include slug plugin
mongoose.plugin(slug);

const signSchema = new mongoose.Schema({  
  name: { type: String, required: true },
  tagline: String,
  url: String,
  sign: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  featured: {type: Boolean, default: false },
  slug: { type: String, slug: ['name'], slug_padding_size: 4,  unique: true }
});

const Sign = mongoose.model('Sign', signSchema);

module.exports = Sign;