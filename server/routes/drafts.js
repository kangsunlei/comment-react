var express = require('express');
var Drafts = require('../models/drafts');//导入模型数据模块
var router = express.Router();

router.get('/', function (req, res) {
    Drafts.fetch(function (err, drafts) {
        if (err) {
            res.json({ err });
        }
        res.json({ data: drafts });
    });
});

router.post('/add', function (req, res) {
    if (req.body.title && req.body.content) {
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

module.exports = router;