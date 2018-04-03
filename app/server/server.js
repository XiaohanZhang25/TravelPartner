'use strict'

const fs = require('fs'),
      helmet = require('helmet');

const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000,
      env = app.get('env');

const mongoose = require('mongoose');

const config = require('./config');

const database = ((config) => {
    let c = config.database[env];
    let db = c.db || 'test',
        port = c.port || '27017',
        host = c.host.join(`:${port},`) || 'localhost',
        user = c.user || '',
        pwd = c.pwd || '',
        extra = c.extra || '';

    return {
        "db": db, "port": port, "host": host,
        "user": user, "pwd": pwd, "extra": extra
    };
})(config);

const dbConnection = ((db) => {
    let userString = '';
    if (db.user != '' && db.pwd != '')
        userString = `${db.user}:${db.pwd}@`;
    
    let connection = `mongodb://${userString}${db.host}:${db.port}/${db.db}`;
    if (db.extra != '')
        connection += `?${db.extra}`;

    //console.log(connection);
    return mongoose.connect(connection);
})(database);

console.log("--------------");

app.use(helmet());

app.use((req, res, next) => {
    console.log(req.headers);
    console.log(`New connection. IP:${req.ip} ${req.method} ${req.path}`);
    next();
});

if (config.server.staticFile) {
    let path = config.server.staticPath;
    if (path === undefined || !fs.existsSync(path)) path = __dirname + "/../../public";
    app.use(express.static(path));
    app.use('*', (req, res) => { res.sendFile('index.html', { root: path }); });
}

dbConnection.then((res) => {
    console.log('Database connected.');

    app.locals.db = mongoose;
    app.listen(port, () => {
        console.log('Server is running. Listening port ' + port);
    });

}, (err) => {
    console.log('Cannot connect to the database.');
})

