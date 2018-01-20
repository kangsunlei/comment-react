var mongoose = require('mongoose');

var DraftsSchema = new mongoose.Schema({
    title: String,
    content: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

DraftsSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

DraftsSchema.statics = {
    fetch: function (cb) { //查询所有数据
        return this
            .find()
            .sort('meta.updateAt') //排序
            .exec(cb); //回调
    }
};

module.exports = DraftsSchema;