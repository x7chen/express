var userModel = require('../model/user');
var friendModel = require('../model/friends');
var users = require('../model/users');
Utility = require('../util/util').Utility;

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/db_flow'; //# 数据库为 db_flow
 
var selectData = function(db,data, callback) {  
  //连接到表  
  var collection = db.collection('user');
  var str = JSON.stringify(data);
  var acc = JSON.parse(str);
  var whereStr = data;
  collection.find(whereStr).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}
 var userQuery = function(data) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        selectData(db,data,function(result) {
            //console.log(result);
			for (i=0;i<result.length;i++){
				var user = new userModel();
				user.account = result[i].account;
				user.phone = result[i].phone;
				user.type = result[i].type;
				user.avatar_key = result[i].portraitUri;
				user.nickname = result[i].nickname;
				var salt = Utility.random(1000, 9999);
				var hash = Utility.hash(result[i].password, salt);
				user.password_salt = salt;
				user.password_hash = hash;
				userModel.create(user)
				    .then(function(data){
					 console.log(data);
				})
				.catch(function(err){
					 console.log(err);
				});
				console.log(user);
			}
            db.close();
        });
    });
 }
// userQuery({}); 


