var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    a_string: String,
    a_date: Date
});


module.exports = mongoose.model('TestModel', Schema);