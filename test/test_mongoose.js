var userService = require('../controller/userService');
var user = {
    account:'sean',
    password:'123456',
    portraitUri:'abc',
    nickname:'sea',
    type:2,
    phone:'1234567896'
};
var callback = function(result){
    console.log(result);
}

// userService.regist(user,callback);
//userService.login(user,callback);
// userService.login_by_phone(user,callback);
// userService.regist_by_phone(user,callback);
// userService.getUserInfo(user,callback);
// userService.checkAvailable(user,callback);
// userService.setPortrait(user,callback);
 userService.setNickname(user,callback);