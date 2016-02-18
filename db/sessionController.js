var Session = require('./sessionModel');
var User = require('./userModel');
var sessionController = {};

sessionController.isLoggedIn = function(req, res) {
  // console.log(req.cookies.SSID)
  if(req.cookies.SSID) {
    return Session.findOne({cookieId: req.cookies.SSID}, function(err, doc) {
      // console.log(doc)
      if(doc) return true;
      else return false;
    });
  }
};

sessionController.startSession = function(req, res, next) {
  // create session
  var obj = {};

  User.find({userName: req.body.userName}, 'id', function (err, docs) {
    var savedID = docs[0].id;
    obj.cookieId = savedID;

    Session.create(obj);
  });

};

module.exports = sessionController;
