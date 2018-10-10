var express = require('express');
var router = express.Router();
var qiniu = require('../controller/qiniuServer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* GET requst_upload_token. */
router.get('/request_upload_token', function(req, res, next) {

  res.send(qiniu.getUploadToken());

});
/* POST requst_upload_token. */
router.post('/request_upload_token', function(req, res, next) {

  res.send(qiniu.getUploadToken());

});
/* POST requst_upload_token. */
router.post('/request_upload_token', function(req, res, next) {

  res.send(qiniu.getUploadToken());

});

/* GET requst_download_url. */
router.get('/request_download_url', function(req, res, next) {

  res.send(qiniu.getDownloadUrl(req.query.key));

});

module.exports = router;
