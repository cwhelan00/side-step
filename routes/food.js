var express = require('express');
var db = require('../db');
var router = express.Router();

FoodPost = db.model('FoodPost');

router.get('/', function(req, res){
	var sess = req.session;
	var context = {};
	if(sess.account){
		var context = {
			account: sess.account
		}
	}
	res.render('food/main', context);
});

module.exports = router;