var mongoose = require('mongoose');
var mongodbUri = 'mongodb://heroku_kw036qs6:c5ofvhcq16f9096jj15fnbr0t1@ds011248.mongolab.com:11248/heroku_kw036qs6'

mongoose.connect(mongodbUri);

var db = mongoose.connection;
db.once('open', function() {
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema ({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true },
  userName: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  totalPointsWon: {type: Number, default: 0},
  totalPointsLost: {type: Number, default: 0},
  gamesWon: {type: Number, default: 0},
  gamesLost: {type: Number, default: 0},
  pinHold: {type: Boolean, default: false},
  rating: {type: Number, default: 1500}
});



// userSchema.pre('save', function(next) {
//   var salt = bcrypt.genSaltSync(10);
//   var hash = bcrypt.hashSync(this.password, salt);
//   this.password = hash;
//   next();
// });

module.exports = mongoose.model('User', userSchema);
}
