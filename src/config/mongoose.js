const mongoose = require('mongoose');
module.exports = (app) => {
    mongoose
        .connect('mongodb://localhost:27017/db', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
        .then((res) => console.log('Connected to MongoDB'))
        .catch((err) => console.log(err));

    mongoose.Promise = global.Promise;
    process.on('SIGINT', cleanup);
    process.on('SIGNTERM', cleanup);
    process.on('SIGHUP', cleanup);

    if (app) {
        app.set('mongoose', mongoose);
    }
};

function cleanup() {
    mongoose.connection.close(() => {
        process.exit(0);
    });
}
