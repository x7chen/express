Utility = require('../util/util').Utility;
var Config = require('../conf');

var demoText = "helloworld";
console.log(demoText);
var result = Utility.encryptText(demoText, Config.AUTH_COOKIE_KEY);
console.log(result);
var source = parseInt(Utility.decryptText(result, Config.AUTH_COOKIE_KEY));
console.log("cc"+Math.round((1+Math.random())*1000000).toString());
console.log(source);
