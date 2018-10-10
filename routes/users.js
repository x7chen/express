var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var Config = require('../conf');
var Cache = require('../util/cache');
var Session = require('../util/session');
var router = express.Router();
var userManager = require('../controller/userService');
var mobverify = require('../api/MobSMSVerify');
var APIResult = require('../util/util').APIResult;

/* GET. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET. */
router.get('/register', function(req, res, next) {
  userManager.regist(req.query, function(result) {
    res.send(result);
  });

});

/* POST. */
router.post('/register', function(req, res, next) {
  userManager.regist(req.body, function(result) {
    res.send(result);
  });

});

/* GET. */
router.get('/register_by_phone', function(req, res, next) {
  userManager.regist_by_phone(req.query, function(result) {
    res.send(result);
  });

});

/* POST. */
router.post('/register_by_phone', function(req, res, next) {
  userManager.regist_by_phone(req.body, function(result) {
    res.send(result);
  });

});

/* GET. */
router.get('/login', function(req, res, next) {
  userManager.login(req.query, function(result) {
    Session.setAuthCookie(res, req.query.account);
    res.send(JSON.stringify(result));
  });

});

/* POST. */
router.post('/login', function(req, res, next) {
  userManager.login(req.body, function(result) {
    Session.setAuthCookie(res, req.body.account);
    res.send(JSON.stringify(result));
  });

});

/* GET. */
router.get('/login_by_phone', function(req, res, next) {
  userManager.login_by_phone(req.query, function(result) {
    Session.setAuthCookie(res, result.result.id);
    res.send(JSON.stringify(result));
  });

});

/* POST. */
router.post('/login_by_phone', function(req, res, next) {
  userManager.login_by_phone(req.body, function(result) {
    Session.setAuthCookie(res, result.result.id);
    res.send(JSON.stringify(result));
  });

});
/* GET. */
router.get('/login_by_machine', function(req, res, next) {
  userManager.login_by_machine(req.query, function(result) {
    Session.setAuthCookie(res, result.result.id);
    res.send(JSON.stringify(result));
  });

});

/* POST. */
router.post('/login_by_machine', function(req, res, next) {
  userManager.login_by_machine(req.body, function(result) {
    Session.setAuthCookie(res, result.result.id);
    res.send(JSON.stringify(result));
  });

});

/* GET. */
router.get('/check_available', function(req, res, next) {
  userManager.checkAvailable(req.query, function(result) {
    res.send(JSON.stringify(result));
  });

});

/* POST. */
router.post('/check_available', function(req, res, next) {
  userManager.checkAvailable(req.body, function(result) {
    res.send(JSON.stringify(result));
  });

});

/* set_portrait_uri */
router.get('/set_portrait_uri', function(req, res, next) {
  console.log(req.query);
  var userid = Session.getCurrentUserId(req);
  var data = {
    "account": userid,
    "portraitUri": req.query.portraitUri
  };
  console.log(data);
  userManager.setPortrait(data, function(result) {
    res.send(JSON.stringify(result))
  });
});

router.post('/set_portrait_uri', function(req, res, next) {


  var userid = Session.getCurrentUserId(req);
  var data = {
    "account": userid,
    "portraitUri": req.body.portraitUri
  };
  console.log(data);
  userManager.setPortrait(data, function(result) {
    console.log(result);
    res.send(JSON.stringify(result))
  });

});

/* set_nickname. */
router.get('/set_nickname', function(req, res, next) {
  console.log(req.query);
  var userid = Session.getCurrentUserId(req);
  var data = {
    "account": userid,
    "nickname": req.query.nickname
  };
  userManager.setNickname(data, function(result) {
    res.send(JSON.stringify(result))
  });

});

router.post('/set_nickname', function(req, res, next) {
  console.log(req.body);
  var userid = Session.getCurrentUserId(req);
  var data = {
    "account": userid,
    "nickname": req.body.nickname
  };
  userManager.setNickname(data, function(result) {
    res.send(JSON.stringify(result))
  });

});

router.get('/send_verify_code', function(req, res, next) {
  mobverify.verify('86', req.query.phone, req.query.verify_code, function(data) {
    var json = JSON.parse(data);
    //res.send(new APIResult(200,JSON.parse(data)));
    console.log(json.status);
    if (json.status == 200) {
      res.send(new APIResult(200, JSON.parse(data)));
    } else {
      res.send(new APIResult(300, JSON.parse(data)));
    }
  });
});

router.get('/:userid', function(req, res, next) {
  var user = {
    "account": req.params.userid
  };
  userManager.getUserInfo(user, function(result) {
    res.send(JSON.stringify(result));
    console.log(result);
  });
});
module.exports = router;
