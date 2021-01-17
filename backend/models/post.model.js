const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  date_publ: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imgSrc: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
  user: {type: String, required: true, ref: 'User'},
});

module.exports = mongoose.model('Post', postSchema);