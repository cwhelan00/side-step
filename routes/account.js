var express = require('express');
var db = require('../db');
var router = express.Router();

var Account = db.model('Account');

router.get('/profile', function(req, res){
	var sess = req.session;
	if(sess.account){
		var context = {
			account: sess.account,
			lambdas: {
				date: function(date){
					return new Date(date).toLocaleDateString();
				}
			}
		};
		var days = sess.account.days;
		if(days.length > 0){
			context.today = days[days.length - 1];
		}
		res.render('account/profile', context);
	}else{
		res.redirect('/');
	}
});

router.get('/settings', function(req, res){
	var sess = req.session;
	if(sess.account){
		var context = {
			account: sess.account,
		}
		res.render('account/settings', context);
	}else{
		res.redirect('/');
	}
});

router.get('/log', function(req, res){
	var sess = req.session;
	if(sess.account){
		var context = {
			account: sess.account,
			lambdas: {
				date: function(date){
					return new Date(date).toLocaleDateString();
				}
			}
		}
		res.render('account/log', context);
	}else{
		res.redirect('/');
	}
});

router.get('/log/today', function(req, res){
	var sess = req.session;
	if(sess.account){
		var context = {
			account: sess.account,
		};
		var log = sess.account.log;
		if(log.length > 0 && equalsDate(new Date(log[log.length - 1].date_created), new Date())){
			var today = log[log.length - 1];
			context.breakfast = today.breakfast;
			context.lunch = today.lunch;
			context.dinner = today.dinner;
			context.snack = today.snack;
		}
		res.render('account/today', context);
	}else{
		res.redirect('/');
	}
});

router.get('/log/date/:date', function(req, res){
	var date_created = req.params.date;
	var sess = req.session;
	var log = sess.account.log;
	for(var i = 0; i < log.length; i++){
		var entry = log[i];
		console.log(entry.date_created);
		if(equalsDate(new Date(date_created), new Date(entry.date_created))){
			var context = {
				breakfast: entry.breakfast,
				lunch: entry.lunch,
				dinner: entry.dinner,
				snack: entry.snack
			};

			res.render('account/date', context);
		}
	}
});

router.get('/get/days', function(req, res){
	var sess = req.session;
	res.send(sess.account.days);
});

router.get('/get/goals', function(req, res){
	var sess = req.session;
	res.send(sess.account.goals);
});

router.post('/update/:setting', function(req, res){
	var setting_name = req.params.setting;
	var setting;
	if(setting_name === 'name'){
		setting = {
			first: req.body.first,
			last: req.body.last
		};
	}else{
		setting = req.body[setting_name];
	}
	var sess = req.session;
	Account.findOne({username: sess.account.username}, function(err, account){
		if(err){
			console.log(err);
		}

		account[setting_name] = setting;
		account.save();
		sess.account = account;
		res.redirect('/account/settings');

	});
});

function equalsDate(date1, date2){
	if(date1.getFullYear() === date2.getFullYear()){
		if(date1.getMonth() === date2.getMonth()){
			if(date1.getDate() === date2.getDate()){
				return true;
			}
		}
	}

	return false;
}

router.post('/update/days/today', function(req, res){
	var sess = req.session;
	var update = false;
	var today = {
		date: new Date(),
		calories: req.body.calories,
		sleep: req.body.sleep,
		water: req.body.water,
		weight: req.body.weight
	};
	var days = sess.account.days;
	if(days.length > 0){
		if(equalsDate(new Date(today.date), new Date(days[days.length - 1].date))){
			update = true;
		}
	}
	Account.findOne({username: sess.account.username}, function(err, account){
		if(err){
			console.log(err);
		}
		console.log(account);
		if(update){
			account.days.set(account.days.length - 1, today);
		}else{
			account.days.push(today);
		}
		account.save();
		sess.account = account;
		res.redirect('/account/profile');

	});
});

router.post('/update/log/:meal', function(req, res){
	var meal_name = req.params.meal;
	var sess = req.session;
	var log = sess.account.log;
	var meal = [];
	var foods = req.body.foods;
	var amounts = req.body.amounts;
	if(foods){
		for(var i = 0; i < foods.length; i++){
			if(foods[i] !== ""){
				var item = {
					food: foods[i],
					amount: amounts[i]
				};
				meal.push(item);
			}
		}
	}

	Account.findOne({username: sess.account.username}, function(err, account){
		console.log(account.log.length);
		if(account.log.length === 0 || !(equalsDate(account.log[account.log.length - 1].date_created, new Date()))){
			account.log.push({
				date_created: new Date(),
				breakfast: [],
				lunch: [],
				dinner: [],
				snack: []
			});
		}
		

		var today = account.log[account.log.length - 1];
		today[meal_name] = meal;
		account.log.set(account.log.length - 1, today);
		console.log(account.log);
		account.save();
		sess.account = account;
		res.redirect('/account/log/today');
	});
});

router.post('/update/goals/:goal', function(req, res){
	var goal = req.params.goal;
	var sess = req.session;
	Account.findOne({username: sess.account.username}, function(err, account){
		if(err){
			console.log(err);
		}

		account.goals[goal] = req.body[goal];
		account.save();
		sess.account = account;
		res.redirect('/account/settings');

	});
});

module.exports = router;