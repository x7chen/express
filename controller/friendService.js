var friendModel = require('../model/friends');
Utility = require('../util/util').Utility;

var invite = function(user, callback) {
  var errorMessage = 'Invalid phone or password.';
  var responseBody = {};
  var responseResult = {};
  userModel.findOne({account: user.account}).then(function(quser) {
    // console.log(quser);
    var hash = Utility.hash(user.password, quser.password_salt);
    // console.log(hash+':'+quser.password_salt);
    if (hash !== quser.password_hash) {
      responseBody.code = 400;
      responseBody.result = responseResult;
      callback(responseBody);
      return;
    }
    responseBody.code = 200;
    responseResult.token = tls.getSigId(quser.account);
    responseResult.type = quser.type;
    responseResult.portraitUri = quser.avatar_key;
    responseBody.result = responseResult;
    callback(responseBody);
  }).catch(function(reason) {
    // console.log(reason);
    responseBody.code = 400;
    responseBody.result = responseResult;
    callback(responseBody);
  })
};

var agree = function(user, callback) {
  var errorMessage = 'Invalid phone or password.';
  var responseBody = {};
  var responseResult = {};
  userModel.findOne({phone: user.phone}).then(function(quser) {
    // console.log(quser);
    responseBody.code = 200;
    responseResult.token = tls.getSigId(quser.account);
    responseResult.type = quser.type;
    responseResult.portraitUri = quser.avatar_key;
    responseBody.result = responseResult;
    callback(responseBody);
  }).catch(function(reason) {
    // console.log(reason);
    responseBody.code = 400;
    responseBody.result = responseResult;
    callback(responseBody);
  })
};

var ignore = function(user, callback) {
  var responseBody = {};
  var responseResult = {};
  salt = Utility.random(1000, 9999);
  hash = Utility.hash(user.password, salt);
  var new_user = new userModel({account: user.account, nickname: user.nickname, type: user.type, password_salt: salt, password_hash: hash});
  userModel.create(new_user).then(function(quser) {
    // console.log(quser);
    responseBody.code = 200;
    responseResult.id = quser._id;
    responseBody.result = responseResult;
    callback(responseBody);
  }).catch(function(err) {
    // console.log(err);
  });
};

var delete_one = function(user, callback) {
  var responseBody = {};
  var responseResult = {};
  var salt = Utility.random(1000, 9999);
  var hash = Utility.hash(user.password, salt);
  var account = "cc" + Math.round((Math.random()) * 100000000).toString();
  var new_user = new userModel({
    account: account,
    nickname: user.nickname,
    phone: user.phone,
    type: user.type,
    password_salt: salt,
    password_hash: hash
  });
  userModel.create(new_user).then(function(data) {
    // console.log(data);
    responseBody.code = 200;
    responseResult.id = data._id;
    responseBody.result = responseResult;
    callback(responseBody);
  }).catch(function(err) {
    // console.log(err);
  });
};

var set_display_name = function(user, callback) {
  var responseBody = {};
  var responseResult = {};
  userModel.findOne({account: user.account}).then(function(quser) {
    // console.log(quser);
    responseBody.code = 200;
    responseResult.id = quser.account;
    responseResult.nickname = quser.nickname;
    responseResult.portraitUri = quser.avatar_key;
    responseBody.result = responseResult;
    callback(responseBody);
  }).catch(function(reason) {
    // console.log(reason);
    responseBody.code = 400;
    responseBody.result = responseResult;
    callback(responseBody);
  })
};

var get_all = function(user, callback) {
  var responseBody = {};
  var responseResult = {};
  userModel.findOne({account: user.account}).then(function(quser) {
    // console.log(quser);
    responseBody.code = 400;
    responseBody.result = responseResult;
    callback(responseBody);

  }).catch(function(reason) {
    // console.log(reason);
    responseBody.code = 200;
    responseBody.result = responseResult;
    callback(responseBody);
  })
};

exports.invite = invite;
exports.agree = agree;
exports.ignore = ignore;
exports.delete_one = delete_one;
exports.set_display_name = set_display_name;
exports.get_all = get_all;
