var qiniu = require('qiniu');

var accessKey = 'QPTpYlTaIGEYtcpw3LotvtifKpXLQA31Fqhv0sxw';
var secretKey = 'C4XcwfMQgClGBbIJYVi32Ae06yNaohJDiD1hN_1X';
var bucket = 'xiaov';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var BucketDomain = 'avatar.hersmile.top';

//生成上传凭证
var getUploadToken = function() {
  var options = {
    scope: bucket,
    expires: 7200
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);
  console.log(uploadToken)

  var res = {};
  var result = {};
  res.code = 200;
  result.target = 'qiniu';
  result.domain = BucketDomain;
  result.token = uploadToken;
  res.result = result;

  // res.result.target = 'qiniu';
  // res.result.domin = BucketDomain;
  // res.result.token = uploadToken;

  //res.url = BucketDomain;
  //res.uploadToken = uploadToken;
  return res;
}

//生成下载链接（私有空间）
var getDownloadUrl = function(key) {
  var config = new qiniu.conf.Config();
  var bucketManager = new qiniu.rs.BucketManager(mac, config);

  var deadline = parseInt(Date.now() / 1000) + 3600; // 1小时过期
  var privateDownloadUrl = bucketManager.privateDownloadUrl('http://' + BucketDomain, key, deadline);
  console.log(privateDownloadUrl);
  var res = {};
  var res_result = {};
  res_result.key = key;
  res_result.privateDownloadUrl = privateDownloadUrl;
  res.code = 200;
  res.result = res_result;
  return res;
}

exports.getUploadToken = getUploadToken;
exports.getDownloadUrl = getDownloadUrl;
