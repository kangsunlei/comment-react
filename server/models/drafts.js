var mongoose = require('mongoose');
var DraftsSchema = require('../schemas/drafts');
var Drafts = mongoose.model('Drafts', DraftsSchema);

module.exports = Drafts;