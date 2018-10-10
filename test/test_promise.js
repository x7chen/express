
var userModel = require('../model/user');
Utility = require('../util/util').Utility;

function regist_one_by_machine(machine_id){
  return new Promise(function(resolve,reject){
    var salt = Utility.random(1000, 9999);
    var hash = Utility.hash(Math.round((Math.random())*100000000), salt);
    var account = "cc"+Math.round((Math.random())*100000000).toString();
    var new_user = new userModel({
        account:account,
        nickname:'小V',
        machine_id:machine_id,
        type:1,
        password_salt:salt,
        password_hash:hash,
        });
    userModel.create(new_user)
    .then(function(data){
        resolve(data);
      })
    .catch(function(err){
      reject(err);
        // console.log(err);
    });
  })
};

regist_one_by_machine('regist_one_by_machine')
.then(function(data){
  console.log(data);
})
.catch(function(reason){
  console.log(reason);
});
