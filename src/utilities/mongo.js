const mongoose = require('mongoose');
const { mongoPath } = require('@root/config.json');


module.exports = async () => {
    try{
        return await mongoose.connect(mongoPath, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    } catch (err) {
        throw new Error(err);
    }
}