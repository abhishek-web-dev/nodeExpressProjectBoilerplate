// dependency library
const mongoose = require('mongoose');

const cookiesSchema = new mongoose.Schema({
  user_id: { type: String, unique: true, index: true, required: true },
  cookies: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model('cookies', cookiesSchema);