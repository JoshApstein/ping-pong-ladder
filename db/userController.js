var User = require('./userModel');
var userController = {};
var bcrypt = require('bcryptjs');
var sessionController = require('./sessionController');

userController.createUser = function(req, res) {
    if(req.body.userName === 'iluvpool19')
      req.body.pinHold = true;
    User.create(req.body, function(err, data) {
    if(err) {
      // throw err
      return res.status(500).send('showAlert');
    }
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;
    res.cookie('SSID', data.id);
    sessionController.startSession(req, res, data._id);
    data.save();

    return res.send({redirect: '/profile?id=' + data.id});
  });
};

userController.verify = function(req, res) {
  User.findOne({userName:req.body.userName}, function(err, doc) {
    if (doc) {
      console.log(req.body.userName)
      if(bcrypt.compareSync(req.body.password, doc.password)) {
        res.cookie('SSID', doc.id);
        sessionController.startSession(req, res, doc._id);
        return res.send({redirect: '/profile?id=' + doc.id});
        }
      console.log('bye')
      return res.status(500).send('showAlert');
    }
    console.log('hi')
    return res.status(500).send('showAlert');

  });

};

userController.changeStats = function(req, res) {
  var winnerPin = false;
  var winnerRating = 0;
  var loserPin = false;
  var loserRating = 0;
  var baseRating = 0;
  User.findOne({userName: req.body.winner}, function(err, doc){
    // console.log(doc)
    doc.gamesWon+=1;
    doc.totalPointsWon+=parseInt(req.body.winScore);
    doc.totalPointsLost+=parseInt(req.body.loseScore);
    winnerPin = doc.pinHold;
    winnerRating = doc.rating;
    doc.save();
    // console.log(doc)
  }).then(
    User.findOne({_id:req.cookies.SSID}, function(err, doc2) {
      // console.log(doc2)
      // console.log(req.body)
      doc2.gamesLost = doc2.gamesLost + 1;
      doc2.totalPointsLost = doc2.totalPointsLost + parseInt(req.body.winScore);
      doc2.totalPointsWon = doc2.totalPointsWon + parseInt(req.body.loseScore);
      loserPin = doc2.pinHold;
      loserRating = doc2.rating;
      doc2.save();
      // console.log('loser' + loserRating)
      baseRating = loserRating > winnerRating ? Math.floor(winnerRating/30) : Math.floor(loserRating/30);

    })
  ).then(
    User.findOne({_id:req.cookies.SSID}, function(err, doc2) {
      if(loserPin) doc2.pinHold = false;
      doc2.rating = doc2.rating - baseRating;
      doc2.save();
      console.log(baseRating)

    })
  ).then(
    User.findOne({userName: req.body.winner}, function(err, doc){
      if(loserPin) doc.pinHold = true;
      doc.rating = doc.rating + baseRating;
            console.log(baseRating)
      doc.save();
    })
  ).then(function() {
    return res.send({redirect: '/profile?id=' + req.cookies.SSID});
  });
  // return res.send({redirect: '/profile?id=' + req.cookies.SSID});
};

module.exports = userController;
