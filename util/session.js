var Cache, Config, Session, Utility;

Config = require('../conf');

Cache = require('./cache');

Utility = require('./util').Utility;

Session = (function () {
  function Session() { }

  Session.getCurrentUserId = function (req) {
    var cookie;
    cookie = req.cookies[Config.AUTH_COOKIE_NAME];
    if (!cookie) {
      return null;
    }
    return Utility.decryptText(cookie, Config.AUTH_COOKIE_KEY);
  };

  Session.getCurrentUserNickname = function (userId, UserModel) {
    return new Promise(function (resolve, reject) {
      return Cache.get('nickname_' + userId).then(function (cachedNickname) {
        if (cachedNickname) {
          return resolve(cachedNickname);
        }
        return UserModel.getNickname(userId).then(function (nickname) {
          if (nickname) {
            Cache.set('nickname_' + userId, nickname);
          }
          return resolve(nickname);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    });
  };

  Session.setNicknameToCache = function (userId, nickname) {
    if (!Number.isInteger(userId) || Utility.isEmpty(nickname)) {
      throw new Error('Invalid userId or nickname.');
    }
    return Cache.set('nickname_' + userId, nickname);
  };

  Session.setAuthCookie = function (res, userId) {
    var value;
    value = Utility.encryptText(userId, Config.AUTH_COOKIE_KEY);
    return res.cookie(Config.AUTH_COOKIE_NAME, value, {
      httpOnly: true,
      domain: Config.AUTH_COOKIE_DOMAIN,
      maxAge: Config.AUTH_COOKIE_MAX_AGE,
      expires: new Date(Date.now() + Config.AUTH_COOKIE_MAX_AGE)
    });
  };

  return Session;

})();

module.exports = Session;
