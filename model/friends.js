var mongoose = require('./connection');

var FriendSchema = mongoose.Schema({
    account: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'Why no account?']
    },
    friend: String,
    displayname: String,
    message: String, //邀请信息
    status: Number,  //10: 请求, 11: 被请求, 20: 同意, 21: 忽略, 30: 被删除
    timestamp: { type: Date, default: Date.now }
});

var Friends = mongoose.model('Friends', FriendSchema);

module.exports = Friends;