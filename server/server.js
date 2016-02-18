var express = require('express');
var app = express();
var UserCtrl = require('./../db/userController');
var sessionController = require('./../db/sessionController');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var fs = require('fs');
var User = require('./../db/userModel');
var mongoose = require('mongoose');
var mongoURI = 'mongodb://heroku_kw036qs6:c5ofvhcq16f9096jj15fnbr0t1@ds011248.mongolab.com:11248/heroku_kw036qs6';
mongoose.connect(mongoURI);

app.use(cookieParser());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
//get all static files
app.get('/login.js', function(request, response, next) {
  response.writeHead(200, {'content-type': 'text/javascript; charset=UTF-8'});
  response.end(fs.readFileSync(__dirname + './../client/login/login.js'));
});
app.get('/style.css', function(request, response, next) {
  response.writeHead(200, {'content-type': 'text/css; charset=UTF-8'});
  response.end(fs.readFileSync(__dirname + './../client/profile/style.css'));
});
app.get('/signup.js', function(request, response, next) {
  response.writeHead(200, {'content-type': 'text/javascript; charset=UTF-8'});
  response.end(fs.readFileSync(__dirname + './../client/signup/signup.js'));
});
app.get('/prof.js', function(request, response, next) {
  response.writeHead(200, {'content-type': 'text/javascript; charset=UTF-8'});
  response.end(fs.readFileSync(__dirname + './../client/profile/prof.js'));
});
app.get('/jquery.js', function(request, response, next) {
  response.writeHead(200, {'content-type': 'text/javascript; charset=UTF-8'});
  response.end(fs.readFileSync(__dirname + './../client/login/jquery.js'));
});
app.get('/pin.jpg', function(request, response, next) {
  response.writeHead(200, {'content-type': 'img/jpg'});
  response.end(fs.readFileSync(__dirname + './../client/profile/pin.jpg'));
});
app.get('/Grand-Canyon-3.jpg', function(request, response, next) {
  response.writeHead(200, {'content-type': 'img/jpg'});
  response.end(fs.readFileSync(__dirname + './../client/profile/Grand-Canyon-3.jpg'));
});


// take care of login and signup routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + './../client/login/login.html'));
});
app.post('/', UserCtrl.verify);

app.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname + './../client/signup/signup.html'));
});
app.post('/signup', UserCtrl.createUser);

// profile pages
app.get('/profile', function(req, res) {
  var prof;
  var allProfs;
  User.findOne({_id: req.query.id}, function(err, doc) {
    prof = doc;
  }).then(User.find({}, function(err, docs) {
    allProfs = docs;
  })).then(function() {

    allProfs.sort(function(a,b){return b.rating-a.rating})
        // console.log(allProfs)
    if(sessionController.isLoggedIn(req, res))
      return res.render('./../client/profile/prof', {all: allProfs, profile: prof});
    else res.send('NOT ALLOWED');
  });
});
app.post('/profile', UserCtrl.changeStats);

app.listen(3000);

module.exports = app;
