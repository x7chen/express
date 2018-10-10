var Queue = require('../util/queue');

function UserStatus(id, status) {
    this.id = id;
    this.status = status;
    this.timestamp = Date.now();
};
userqueue = new Queue();
userqueue.enqueue(new UserStatus('sean','1'));
userqueue.enqueue(new UserStatus('sean','2'));
userqueue.enqueue(new UserStatus('sean','3'));
userqueue.enqueue(new UserStatus('sean','4'));
userqueue.enqueue(new UserStatus('sean','1'));
userqueue.enqueue(new UserStatus('sean','2'));
userqueue.enqueue(new UserStatus('sean','3'));
userqueue.enqueue(new UserStatus('sean','4'));
console.log(userqueue.count()); 
var count = userqueue.count();
for (var i = 0; i < count; ++i ) {
    var user = userqueue.dequeue();
    console.log(JSON.stringify(user));   
    console.log(i); 
};