var express = require('express');
var db = require('../db');
var ObjectId = db.Types.ObjectId;
var router = express.Router();

var Thread = db.model('Thread');

router.get('/', function(req, res){
	var sess = req.session;
	Thread.find({}, function(err, threads){
		var context = {
			account: sess.account,
			"threads": threads
		};
		res.render('forum/main', context);
	});
});

router.get('/threads/:id', function(req, res){
	var id = new ObjectId(req.params.id);
	var sess = req.session;
	Thread.findOne({_id: id}, function(err, thread){
		if(err){
			console.log(err);
		}
		var context = {
			account: sess.account,
			"thread": thread,
			lambdas: {
				date: function(date){
					return new Date(date).toLocaleDateString();
				}
			}
		};
		res.render('forum/thread', context);
	});
});

router.post('/response/:id', function(req, res){
	var id = new ObjectId(req.params.id);
	var sess = req.session;
	Thread.findOne({_id: id}, function(err, thread){
		if(err){
			console.log(err);
		}
		var username = sess.account.username;
		var body = req.body.body;
		console.log(body);
		var response = {
			"username": username,
			"body": body,
			date_created: new Date()
		};
		thread.comments.push(response);
		thread.save(function(err){
			if(err){
				console.log(err);
			}
		});
		res.redirect('/forum/threads/'+id);
	}); 
});

router.get('/create', function(req, res){
	var sess = req.session;
	var context = {};
	if(sess.account){
		context = {
			account: sess.account
		};
		res.render('forum/create', context);
	}else{
		res.redirect('/forum');
	}
});

router.post('/create', function(req, res){
	var sess = req.session;
	var schema = {
		username: sess.account.username,
		title: req.body.title,
		body: req.body.body,
		date_created: new Date(),
		comments: []
	}
	var thread = new Thread(schema);
	thread.save(function(err){
		if(err){
			console.log(err);
		}
	});
	res.redirect('/forum');
});

module.exports = router;