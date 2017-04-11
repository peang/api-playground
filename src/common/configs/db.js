var mongoose = require('mongoose');
var fs = require('fs');
var tunnel = require('tunnel-ssh');
var colors = require('colors/safe');

if (process.env.DB_VIA_SSH === 'true') {
    var config = {
        username: `${process.env.DB_SSH_USERNAME}`,
        password: `${process.env.DB_SSH_PASSWORD}`,
        host: `${process.env.DB_SSH_HOST}`,
        agent: process.env.SSH_AUTH_SOCK,
        privateKey: require('fs').readFileSync(`${process.env.DB_SSH_PRIVATE_KEY}`),
        port: `${process.env.DB_SSH_PORT}`,
        dstHost: `${process.env.DB_HOST}`,
        dstPort: `${process.env.DB_PORT}`,
        localHost: '127.0.0.1',
        localPort: 27017
    };

    var server = tunnel(config, function (error, server) {
        if (error) {
            console.log("SSH connection error: " + error);
        }
        mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'DB connection error:'));
        db.once('open', function () {
            // we're connected!
            console.log(colors.cyan(`[database] Connection successful via ssh : ${process.env.DB_SSH_HOST} => ${process.env.DB_HOST}`));
        });
    });
} else {
    mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB connection error:'));
    db.once('open', function () {
        // we're connected!
        console.log(colors.cyan(`[database] Connection successful : ${process.env.DB_HOST}`));
    });
}