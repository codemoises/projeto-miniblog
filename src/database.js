const mongoose = require('mongoose');

const connection = () => {
    try {
        mongoose.connect('mongodb://localhost/27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.Promise = global.Promise
    } catch (error) {
        process.exit(1);
    }
}
module.exports = connection;
