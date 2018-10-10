var express = require('express');
var Queue = require('../util/queue');
var router = express.Router();

function UserStatus(id, status) {
    this.id = id;
    this.status = status;
    this.timestamp = Date.now();
};
var userqueue = new Queue();
/* GET home page. */
router.get('/update/:user', function(req, res, next) {
    userqueue.enqueue(new UserStatus(req.params.user,'online'));
    res.end();
});
router.get('/all', function(req, res, next) {
    var resting ='';
    var count = userqueue.count();
	var users = userqueue.all();
	resting +=  JSON.stringify(users);
    // for (var i = 0; i < count; ++i ) {
        
        // console.log(JSON.stringify(users[i]));   
        // resting +=  JSON.stringify(users[i]);
    // };
    res.send(resting);
});
module.exports = router;