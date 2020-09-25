const mongoose = require('mongoose');

const verificationSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    },
    roleId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('verification-channels', verificationSchema);