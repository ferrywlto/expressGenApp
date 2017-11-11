var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
    name: String,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story'}]
})

module.exports = mongoose.model('Author', schema);
