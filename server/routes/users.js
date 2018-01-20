var express = require('express');
var Users = require('../models/users');//导入模型数据模块
var router = express.Router();

router.get('/', function (req, res) {
    Users.fetch(function (err, users) {
        if (err) {
            res.json({err});
        }
        res.json({ data: users });
    });
});

module.exports = router;