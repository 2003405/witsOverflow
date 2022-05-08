var express = require('express');
var router = express.Router();
var db=require('../database');

/* GET users listing. */
router.get('/user-list', function(req, res, next) {
  var sql='SELECT user , q_asked , q_answer  from questions_table';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('user-list', { title: 'User List', userData: data});
  });
});

module.exports = router;
