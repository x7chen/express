var mongoose = require('./connection');

var UserSchema = mongoose.Schema({
    account: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'Why no account?']
    },
    region: { type: Number, default: 86 },
    type: { type: Number, default: 1 },
    nickname: String,
    phone: {
        type: String,
        unique: true
    },
    machine_id: {
        type: String,
        unique: true
    },
    password_salt: String,
    password_hash: String,
    avatar_key: {
        type: String,
        default: 'Fr2dS_O1gdtasfudLITCQZFuOogZ'
    },
    token: String,
    timestamp: { type: Date, default: Date.now }
});

var Users = mongoose.model('Users', UserSchema);

module.exports = Users;
