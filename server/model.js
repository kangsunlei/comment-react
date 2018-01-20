var mongoose = require('mongoose');
var UsersSchema = new mongoose.Schema({
    name: String,
    password: String,
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

//每次执行都会调用,时间更新操作
UsersSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

DraftsSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

//静态方法
UsersSchema.statics = {
    fetch: function (cb) { //查询所有数据
        return this
            .find()
            .sort('meta.updateAt') //排序
            .exec(cb); //回调
    },
    findById: function (id, cb) { //根据id查询单条数据
        return this
            .findOne({ _id: id })
            .exec(cb);
    },
    findByName: function (name, cb) {
        return this
            .findOne({ name: name })
            .exec(cb);
    }
};

DraftsSchema.statics = {
    fetch: function (cb) { //查询所有数据
        return this
            .find()
            .sort('meta.updateAt') //排序
            .exec(cb); //回调
    }
};

//暴露出去的方法
exports.Users = mongoose.model('Users', UsersSchema);
exports.Drafts = mongoose.model('Drafts', DraftsSchema);
