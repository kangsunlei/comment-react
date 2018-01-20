var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dbtest');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connection success !');
});

var index = require('./routes/index');
var users = require('./routes/users');
var drafts = require('./routes/drafts');

app.use('/', index);
app.use('/users', users);
app.use('/drafts', drafts);

var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
