var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
    title: String,
    author: { type: Schema.Types.ObjectId, ref: 'Author'}
})

module.exports = mongoose.model('Story', schema);