var express = require('express');
var JPush = require("jpush-sdk")
var APIResult = require('../util/util').APIResult;

var router = express.Router();
var client = JPush.buildClient('3667f8c97cd29d4558ce5202', '301813b8c7680e58a54c1054')

router.post('/', function(req, res, next) {
  var data = {
    from: req.body.from,
    to: req.body.to,
    method: req.body.method,
    extra: req.body.extra
  };
  client.push().setPlatform(JPush.ALL).setAudience(JPush.tag(data.to)).setOptions(null, 60)
  //.setAudience(JPush.ALL)
  //.setNotification('Hi, JPush', JPush.ios('ios alert', 'happy', 5))
    .setMessage(JSON.stringify(data)).send(function(err, rest) {
    if (err) {
      console.log(err.message)
      res.send(new APIResult(400, data));
    } else {
      console.log(data);
      res.send(new APIResult(200, data));
    }
  });

});

module.exports = router;
