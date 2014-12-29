var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var foodPostSchema = new mongoose.Schema({
	title: String,
	body: String,
	comments: {type: Array, "default": []}
});

var accountSchema = new mongoose.Schema({
	username: String,
	password: String,
	name: {
		first: String,
		last: String
	},
	email: String,
	date_created: Date,
	days: {type: Array, "default": []},
	log: {type: Array, "default": []},
	goals: {
		calories: Number,
		water: Number,
		sleep: Number,
		weight: Number
	}
});

var threadSchema = new mongoose.Schema({
	username: String,
	title: String,
	body: String,
	date_created: Date,
	comments: {type: Array, "default": []}
});


mongoose.model('FoodPost', foodPostSchema);
mongoose.model('Account', accountSchema);
mongoose.model('Thread', threadSchema);

module.exports = mongoose;