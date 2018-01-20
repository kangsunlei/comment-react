var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dbtest');

var models = require('./model');
var Users = models.Users;
var Drafts = models.Drafts;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connection success !');
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/users', function (req, res) {
    Users.fetch(function (err, users) {
        if (err) {
            console.log(err);
        }
        res.json({ data: users });
    });
});

app.get('/drafts', function (req, res) {
    Drafts.fetch(function (err, drafts) {
        if (err) {
            console.log(err);
        }
        res.json({ data: drafts });
    });
});

app.post('/addDrafts', function (req, res) {
    if(req.title && req.content) {
        var newDraft = new Drafts(req.body);
        newDraft.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    success: true,
                    msg: '添加成功！'
                });
            }
        });
    } else {
        res.json({
            success: false,
            msg: '参数不合法！'
        });
    }

});

var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
