var express = require('express');
var db = require('../db');
var router = express.Router();

router.get('/', function(req, res){
	var sess = req.session;
	var context = {};
	if(sess.account){
		context = {
			account: sess.account
		};
	}
	res.render('exercise/main', context);
});

module.exports = router;