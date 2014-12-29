var express = require('express');
var db = require('../db');
var router = express.Router();

var Account = db.model('Account');

router.get('/', function(req, res){
	var sess = req.session;
	var context = {
		account: sess.account
	};
	res.render('index', context);
});

router.post('/create', function(req, res){
	var schema = {
		username: req.body.username,
		password: req.body.password,
		name: {
			first: req.body.first,
			last: req.body.last
		},
		email: req.body.email,
		date_created: new Date(),
		days: [],
		log: [],
		goals: {
			calories: null,
			water: null,
			sleep: null,
			weight: null
		}
	}
	var account = new Account(schema);
	account.save(function(err){
		if(err){
			console.log(err);
		}
		var sess = req.session;
		sess.account = account;
		res.redirect('/account/profile');
	});
});

router.post('/login', function(req, res){
	res.redirect('/');
});

router.get('/login', function(req, res){
	var username = req.query.username;
	var password = req.query.password;
	console.log(username);
	console.log(password);
	Account.findOne({"username": username, "password": password}, function(err, account){
		if(err){
			console.log(err);
		}
		if(account){
			var sess = req.session;
			sess.account = account;
		}
		res.send(account);
	});
});

router.get('/logout', function(req, res){
	if(req.session.account){
		req.session.destroy(function(err){
			if(err){
				console.log(err);
			}
		});
	}
	res.redirect('/');
});

module.exports = router;