const mongoose = require('mongoose');
const { mongo_uri } = require('@root/config.json');

module.exports = async () => {
    await mongoose.connect(mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    return mongoose;
}