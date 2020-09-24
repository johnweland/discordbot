require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        keepAlive: true
    });
    return mongoose;
}