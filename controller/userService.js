var userModel = require('../model/user');
var friendModel = require('../model/friends');
var tls = require('../controller/tlsServer');
Utility = require('../util/util').Utility;

var login = function (user, callback) {
  var errorMessage = 'Invalid phone or password.';
  var responseBody = {};
  var responseResult = {};
  userModel.findOne({ account: user.account }).then(function (quser) {
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
    responseResult.id = quser.account;
    responseResult.type = quser.type;
    responseResult.portraitUri = quser.avatar_key;
    responseBody.result = responseResult;
    callback(responseBody);
  }).catch(function (reason) {
    // console.log(reason);
    responseBody.code = 400;
    responseBody.result = responseResult;
    callback(responseBody);
  })
};

var login_by_phone = function (user, callback) {
  var errorMessage = 'Invalid phone or password.';
  var responseBody = {};
  var responseResult = {};
  userModel.findOne({ phone: user.phone }).then(function (quser) {
    // console.log(quser);
    responseBody.code = 200;
    responseResult.token = tls.getSigId(quser.account);
    responseResult.id = quser.account;
    responseResult.type = quser.type;
    responseResult.portraitUri = quser.avatar_key;
    responseBody.result = responseResult;
    callback(responseBody);
  }).catch(function (reason) {
    // console.log(reason);
    responseBody.code = 400;
    responseBody.result = responseResult;
    callback(responseBody);
  })
};

function regist_one_by_machine(machine_id) {
  return new Promise(function (resolve, reject) {
    var salt = Utility.random(1000, 9999);
    var hash = Utility.hash(Math.round((Math.random()) * 100000000), salt);
    var account = "cc" + Math.round((Math.random()) * 100000000).toString();
    var new_user = new userModel({
      account: account,
      nickname: '小V',
      machine_id: machine_id,
      type: 1,
      password_salt: salt,
      password_hash: hash
    });
    userModel.create(new_user).then(function (data) {
      resolve(data);
    }).catch(function (err) {
      reject(err);
      // console.log(err);
    });
  })
};

var login_by_machine = function (user, callback) {
  var errorMessage = 'Invalid phone or password.';
  var responseBody = {};
  var responseResult = {};
  userModel.findOne({ machine_id: user.machine_id }).then(function (quser) {
    // console.log(quser);
    responseBody.code = 200;
    responseResult.token = tls.getSigId(quser.account);
    responseResult.id = quser.account;
    responseResult.type = quser.type;
    responseResult.portraitUri = quser.avatar_key;
    responseBody.result = responseResult;
    callback(responseBody);
  }).catch(function (reason) {
    regist_one_by_machine(user.machine_id).then(function (data) {
      responseBody.code = 200;
      responseResult.token = tls.getSigId(data.account);
      responseResult.id = data.account;
      responseResult.type = data.type;
      responseResult.portraitUri = data.avatar_key;
      responseBody.result = responseResult;
      callback(responseBody);
    }).catch(function (reason) {
      // console.log(reason);
      responseBody.code = 400;
      responseBody.result = responseResult;
      callback(responseBody);
    })
  })
};
var regist = function (user, callback) {
  var responseBody = {};
  var responseResult = {};
  salt = Utility.random(1000, 9999);
  hash = Utility.hash(user.password, salt);
  var new_user = new userModel({ account: user.account, nickname: user.nickname, type: user.type, password_salt: salt, password_hash: hash });
  userModel.create(new_user).then(function (quser) {
    // console.log(quser);
    responseBody.code = 200;
    responseResult.id = quser._id;
    responseBody.result = responseResult;
    callback(responseBody);
  }).catch(function (err) {
    // console.log(err);
  });
};

var regist_by_phone = function (user, callback) {
  var responseBody = {};
  var responseResult = {};
  var salt = Utility.random(1000, 9999);
  var hash = Utility.hash(Math.round((Math.random()) * 100000000), salt);
  var account = "cc" + Math.round((Math.random()) * 100000000).toString();
  var new_user = new userModel({
    account: account,
    nickname: user.nickname,
    phone: user.phone,
    type: user.type,
    password_salt: salt,
    password_hash: hash
  });
  userModel.create(new_user).then(function (data) {
    // console.log(data);
    responseBody.code = 200;
    responseResult.id = data._id;
    responseBody.result = responseResult;
    callback(responseBody);
  }).catch(function (err) {
    // console.log(err);
  });
};
var regist_by_machine = function (user, callback) {
  var responseBody = {};
  var responseResult = {};
  regist_one_by_machine(user.machine_id).then(function (data) {
    // console.log(data);
    responseBody.code = 200;
    responseResult.id = data._id;
    responseBody.result = responseResult;
    callback(responseBody);
  }).catch(function (err) {
    // console.log(err);
  });
};
var getUserInfo = function (user, callback) {
  var responseBody = {};
  var responseResult = {};
  userModel.findOne({ account: user.account }).then(function (quser) {
    // console.log(quser);
    responseBody.code = 200;
    responseResult.id = quser.account;
    responseResult.nickname = quser.nickname;
    responseResult.portraitUri = quser.avatar_key;
    responseResult.type = quser.type;
    responseBody.result = responseResult;
    callback(responseBody);
  }).catch(function (reason) {
    // console.log(reason);
    responseBody.code = 400;
    responseBody.result = responseResult;
    callback(responseBody);
  })
};

var checkAvailable = function (user, callback) {
  var responseBody = {};
  var responseResult = {};
  userModel.findOne({ account: user.account }).then(function (quser) {
    //console.log(quser);
    if (quser == null) {
      responseBody.code = 200;
      responseBody.result = responseResult;
      callback(responseBody);
      return;
    }
    responseBody.code = 400;
    responseBody.result = responseResult;
    callback(responseBody);

  }).catch(function (reason) {
    // console.log(reason);
    responseBody.code = 200;
    responseBody.result = responseResult;
    callback(responseBody);
  })
};

var setPortrait = function (user, callback) {
  var responseBody = {};
  var responseResult = {};
  userModel.update({
    account: user.account
  }, { //condition
      $set: {
        avatar_key: user.portraitUri
      }
    }).then(function (quser) {
      if (quser == null) {
        responseBody.code = 400;
        responseBody.result = responseResult;
        callback(responseBody);
      } else {
        responseBody.code = 200;
        responseResult.id = quser.account;
        responseResult.nickname = quser.nickname;
        responseResult.portraitUri = quser.avatar_key;
        responseBody.result = responseResult;
        callback(responseBody);
      }

    }).catch(function (err) {
      responseBody.code = 400;
      responseBody.result = responseResult;
      callback(responseBody);
    })
};
var setNickname = function (user, callback) {
  var responseBody = {};
  var responseResult = {};
  userModel.update({
    account: user.account
  }, { //condition
      $set: {
        nickname: user.nickname
      }
    }).then(function (quser) {
      if (quser == null) {
        responseBody.code = 400;
        responseBody.result = responseResult;
        callback(responseBody);
      } else {
        responseBody.code = 200;
        responseResult.id = quser.account;
        responseResult.nickname = quser.nickname;
        responseResult.portraitUri = quser.avatar_key;
        responseBody.result = responseResult;
        callback(responseBody);
      }
    }).catch(function (err) {
      responseBody.code = 400;
      responseBody.result = responseResult;
      callback(responseBody);
    })
};
exports.login = login;
exports.regist = regist;
exports.login_by_phone = login_by_phone;
exports.login_by_machine = login_by_machine;
exports.regist_by_phone = regist_by_phone;
exports.getUserInfo = getUserInfo;
exports.checkAvailable = checkAvailable;
exports.setPortrait = setPortrait;
exports.setNickname = setNickname;
