//https://developer.qiniu.com/kodo/sdk/1289/nodejs
//生成上传凭证
var qiniu = require('qiniu');
var accessKey = 'QPTpYlTaIGEYtcpw3LotvtifKpXLQA31Fqhv0sxw';
var secretKey = 'C4XcwfMQgClGBbIJYVi32Ae06yNaohJDiD1hN_1X';
var bucket = 'xiaov';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
    scope: bucket,
    expires: 7200
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);
console.log(uploadToken);

//生成下载链接（公开空间）
var config = new qiniu.conf.Config();
var bucketManager = new qiniu.rs.BucketManager(mac, config);
var publicBucketDomain = 'http://ownujg5ck.bkt.clouddn.com';
var key = "hello";
var publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
console.log(publicDownloadUrl);

//生成下载链接（私有空间）
var config = new qiniu.conf.Config();
var bucketManager = new qiniu.rs.BucketManager(mac, config);
var privateBucketDomain = 'http://ownujg5ck.bkt.clouddn.com';
var deadline = parseInt(Date.now() / 1000) + 3600; // 1小时过期
var key = "hello.wav";
var privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, key, deadline);
console.log(privateDownloadUrl);