'use strict'

const fs = require('fs'),
      helmet = require('helmet');

const config = require('./config');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

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
    app.use('*', (req, res) => { res.sendFile('index.html', { root: path }) });
}

app.listen(port, () => {
    console.log('Server is running. Listening port ' + port);
});


