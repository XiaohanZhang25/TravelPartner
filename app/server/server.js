'use strict'

const app = require('express')();

app.use((req, res, next) => {
    console.log(req.headers);
    console.log(`IP:${req.ip} ${req.method} ${req.path}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(4000, () => { console.log('Server started.'); });


