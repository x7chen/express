var users = require('../model/users');
var tls = require('../controller/tlsServer');

var login = function(user, callback) {
  var data = {
    "account": user.account,
    "password": user.password
  };
  var jsonResult = {};
  var jsonRes = {};
  console.log("data=>" + JSON.stringify(data));
  users.userQuery(data, function(result) {
    if (result.length > 0) {
      jsonResult.code = 200;
      jsonRes.id = user.account;
      jsonRes.token = tls.getSigId(user.account);
      jsonResult.result = jsonRes;
      callback(jsonResult);
    } else {
      jsonResult.code = 400;
      jsonResult["result"] = jsonRes;
      callback(jsonResult);
    }
  });
};

var login_by_phone = function(user, callback) {
  var data = {
    "phone": user.phone
  };
  var jsonResult = {};
  var jsonRes = {};
  console.log("data=>" + JSON.stringify(data));
  users.userQuery(data, function(result) {
    if (result.length > 0) {
      jsonResult.code = 200;
      jsonRes.id = result[0].account;
      jsonRes.token = tls.getSigId(result[0].account);
      jsonResult.result = jsonRes;
      callback(jsonResult);
    } else {
      jsonResult.code = 400;
      jsonResult["result"] = jsonRes;
      callback(jsonResult);
    }
  });
};

var regist = function(user, callback) {
  var data = {
    "account": user.account,
    "password": user.password,
    "nickname": user.nickname,
    "type": user.type,
    "portraitUri": "Fpdwg59G6nOXltjgLD5WxAE6KxA5"
  };
  var jsonResult = {};
  var jsonRes = {};
  users.userCreate(data, function(result) {
    jsonResult.code = 200;
    jsonRes.id = result._id;
    jsonResult.result = jsonRes;
    callback(jsonResult);
  });
};

var regist_by_phone = function(user, callback) {
  var data = {
    "phone": user.phone,
    "nickname": user.nickname,
    "type": user.type,
    "portraitUri": "Fpdwg59G6nOXltjgLD5WxAE6KxA5"
  };
  data.account = "cc" + Math.round((Math.random()) * 100000000).toString();
  var jsonResult = {};
  var jsonRes = {};
  users.userCreate(data, function(result) {
    jsonResult.code = 200;
    jsonRes.id = result._id;
    jsonResult.result = jsonRes;
    callback(jsonResult);
  });
};

var getUserInfo = function(user, callback) {
  var data = {
    "account": user.account
  };
  var jsonResult = {};
  var jsonRes = {};
  console.log("data=>" + JSON.stringify(data));
  users.userQuery(data, function(result) {
    if (result.length > 0) {
      jsonResult.code = 200;
      delete result[0]._id;
      delete result[0].password;
      result[0].id = result[0].account;
      delete result[0].account;
      jsonResult.result = result[0];
      callback(jsonResult);
    } else {
      jsonResult.code = 400;
      jsonResult["result"] = jsonRes;
      callback(jsonResult);
    }
  });
};

var checkAvailable = function(user, callback) {
  var data = {
    "account": user.account
  };
  var jsonResult = {};
  users.userQuery(data, function(result) {
    if (result.length > 0) {
      jsonResult.code = 400;
      jsonResult.result = false;
      callback(jsonResult);
    } else {
      jsonResult.code = 200;
      jsonResult.result = true;
      callback(jsonResult);
    }
  });
};

var setPortrait = function(user, callback) {
  var data = {
    "account": user.account,
    "portraitUri": user.portraitUri
  };
  var jsonResult = {};
  var jsonRes = {};
  console.log("data=>" + JSON.stringify(data));
  users.userUpdate(data, function(result) {
    if (result.length > 0) {
      jsonResult.code = 200;
      jsonRes.id = user.account;
      jsonRes.nickname = result[0].nickname;
      jsonRes.portraitUri = result[0].portraitUri;
      jsonResult.result = jsonRes;
      callback(jsonResult);
    } else {
      jsonResult.code = 400;
      jsonResult["result"] = jsonRes;
      callback(jsonResult);
    }
  });
};
var setNickname = function(user, callback) {
  var data = {
    "account": user.account,
    "nickname": user.nickname
  };
  var jsonResult = {};
  var jsonRes = {};
  console.log("data=>" + JSON.stringify(data));
  users.userUpdate(data, function(result) {
    if (result.length > 0) {
      jsonResult.code = 200;
      jsonRes.id = user.account;
      jsonRes.nickname = result[0].nickname;
      jsonRes.portraitUri = result[0].portraitUri;
      jsonResult.result = jsonRes;
      callback(jsonResult);
    } else {
      jsonResult.code = 400;
      jsonResult["result"] = jsonRes;
      callback(jsonResult);
    }
  });
};
exports.login = login;
exports.regist = regist;
exports.login_by_phone = login_by_phone;
exports.regist_by_phone = regist_by_phone;
exports.getUserInfo = getUserInfo;
exports.checkAvailable = checkAvailable;
exports.setPortrait = setPortrait;
exports.setNickname = setNickname;
