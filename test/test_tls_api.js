var tlsapi = require('../controller/TLSAPI');

var config = {
	"sdk_appid" : 1400036822,
	"public_key" : "tls_key/public_key",
	"private_key" : "tls_key/private_key"
}
var sig  = new tlsapi.Sig(config);
console.log(sig.private_key);
result = sig.genSig("ww123456");
console.log(result);
verify = sig.verifySig(result,"ww123456");
console.log("verify result:"+verify);