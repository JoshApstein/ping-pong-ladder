var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 3600, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);
