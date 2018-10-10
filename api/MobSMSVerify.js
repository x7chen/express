var request = require('request');
const APP_KEY = '220f487e81dea';
var options = {
    url:'https://webapi.sms.mob.com/sms/verify',
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlendcoded',
    }
};

var verify = function(zone,phone,verify_code,callback){
    var contents = {
        "appkey":APP_KEY,
        "phone":'',
        "zone":'',
        "code":''
    };
    contents.zone = zone;
    contents.phone = phone;
    contents.code = verify_code;
	options.form = contents;
    console.log("data:",JSON.stringify(contents)); 
    console.log("data:",options);
	request(options,function(err,res,body){
		if(err){
			console.log("error:"+err);
            callback(err);
		}else{
			console.log("body:"+body);
            callback(body);
		}
	});
};

exports.verify = verify;
 
