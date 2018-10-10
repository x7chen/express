var JPush = require("jpush-sdk")
var client = JPush.buildClient('3667f8c97cd29d4558ce5202', '301813b8c7680e58a54c1054')
var room = 'hel'
//easy push
client.push().setPlatform(JPush.ALL)
    //.setAudience(JPush.ALL)
    .setAudience(JPush.tag(room))
    .setNotification('Hi, JPush', JPush.ios('ios alert', 'happy', 5))
    .setMessage('xiaoming')
    .send(function(err, res) {
        if (err) {
            console.log(err.message)
        } else {
            console.log('Sendno: ' + res.sendno)
            console.log('Msg_id: ' + res.msg_id)
        }
    });