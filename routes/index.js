var express = require('express');
var router = express.Router();

var Test = require('../models/Test');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//search mongoDb
router.get('/search1', function(req, res, next){
  Test.find({a_string: 'hi'}, 'a_string a_date', function(err, test){
    if(err) res.render('error', {error: err});
    res.render('index', test);
  })
})

//another way to search
router.get('/search2', function(req, res, next){
  var q = Test.find({'a_string': 'bye'});
  q.select('a_string a_date');
  q.limit(3);
  q.sort({ a_date: -1});
  q.exec(function(err, test){
    if(err) res.render('error', {error: err});
    res.render('index', {title:test});
  })
})

//count
router.get('/search3', function(req, res, next){
  var tests = Test.count()
  .where('a_string').equals('hi')
  .sort({a_date: -1})
  .select('a_string a_date')
  .exec(function(err, test){
    if(err) res.render('error', {error: err});
    res.render('index', {title: test})
  })
})

var bob_id;
//relation search by name
var Story = require('../models/story');
router.get('/search4', function(req, res, next){
  var tests = Story.findOne({ title: 'first story'})
  .populate('author')
  .exec(function(err, story){
    if(err) res.render('error', {error: err});
    res.render('index', {title: 'By '+story.author.name})
    bob_id = story.author._id;
  })
})

//reserve search by author
var Story = require('../models/author');
router.get('/search5', function(req, res, next){
  var tests = Story.find({ title: 'first story'})
  .populate('author')
  .exec(function(err, story){
    if(err) res.render('error', {error: err});
    res.render('index', {title: 'By '+story.author.name})
  })
})

router.get('/db', function(req,res,next){
  var errors = [];
  var results = '';
  var test = new Test({a_string: 'hi', a_date: Date.now()});
  test.save(function(err){
    if(err) res.render('error', {error: err});
    else res.render('index',{title: test.a_date+""})
  });
  //other way
  Test.create({a_string: 'bye',a_date: Date.now()}, function(err, instance){
    if(err) res.render('error',{error: err});
    else res.render('index',{title: instance.a_string+''})
  })
  
  // res.sendStatus(200);
})

module.exports = router;
