const mongoose = require('mongoose');
const profileSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    guildId: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('users', profileSchema);