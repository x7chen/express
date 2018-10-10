var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/db_flow'; //# 数据库为 db_flow

var selectData = function (db, data, callback) {
    //连接到表  
    var collection = db.collection('user');
    var str = JSON.stringify(data);
    var acc = JSON.parse(str);
    var whereStr = data;
    collection.find(whereStr).toArray(function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
}

function userQuery(data, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        console.log("连接成功！");
        selectData(db, data, function (result) {
            console.log(result);
            callback(result);
            db.close();
        });
    });
}


var insertData = function (db, data, callback) {
    //连接到表 site
    var collection = db.collection('user');
    collection.insert(data, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
};

var userCreate = function (data, callback) {
    //插入数据
    //var data = {"account":"sean","psssword":"12345678"};
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        console.log("连接成功！");
        insertData(db, data, function (result) {
            console.log(result);
            callback(result);
            db.close();
        });
    });
};

var updateData = function (db, data, callback) {
    //连接到表  
    var collection = db.collection('user');
    //更新数据
    var whereStr = { "account": data.account };
    var updateStr = { $set: data };
    collection.update(whereStr, updateStr, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
};

var userUpdate = function (data, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        console.log("连接成功！");
        updateData(db, data, function (result) {
            //console.log(result);
            callback(data);
            db.close();
        });
    });
};

exports.userQuery = userQuery;
exports.userCreate = userCreate;
exports.userUpdate = userUpdate;