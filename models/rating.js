var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ratingSchema = new Schema({
	movie: String,
	genre: String,
	rate: {type: Number, min: 0, max:10},
	description: String,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Rating', ratingSchema);