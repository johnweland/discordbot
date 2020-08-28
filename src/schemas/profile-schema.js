const mongoose = require('mongoose');
const profileSchema = mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('users', profileSchema);