var tlsapi = require('../controller/TLSAPI');

var config = {
	"sdk_appid" : 1400036822,
	"public_key" : "tls_key/public_key",
	"private_key" : "tls_key/private_key"
}
var sig  = new tlsapi.Sig(config);
var getSigId = function(id){
    
    return sig.genSig(id);
    
}

exports.getSigId = getSigId;