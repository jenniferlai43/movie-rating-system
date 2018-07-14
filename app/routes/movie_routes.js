// routes/note_routes.js
var mongoose = require('mongoose');

var Rating = require('../../models/rating');

module.exports = function(app) {

	//index page
	app.get('/', function(req, res) {
		Rating.find(function(err, movies) {
			if (err) {
				res.send({'error': 'An error has occurred'});
			}
			else {
				//res.render will look in views folder
				res.render('pages/index', {list: movies});
			}
		});
	});

	app.get('/movies', function(req, res) {
		Rating.find(function(err, movies) {
			if (err) {
				res.send({'error': 'An error has occured'});
			}
			else {
				res.json(movies);
			}
		});
	});

	app.get('/movies/:id', function(req, res) {
		const id = req.params.id;
		Rating.findById(id, function(err, movie) {
			if (err) {
				res.send({'error': 'An error has occurred'});
			}
			else {
				res.send(movie);
			}
		});
	});

	app.delete('/movies/:id', function(req, res) {
		const id = req.params.id;
		Rating.remove({
			_id : id
		}, function(err) {
			if (err)
			{
				res.send({'error': 'An error has occurred'});
			}
			else {
				res.send('Movie ' + id + ' deleted.');
			}
		});
	});

	app.post('/movies', function(req, res) {
		Rating.create({
			movie: req.body.movie,
			genre: req.body.genre,
			rate: req.body.rate,
			description: req.body.description,
			created_at: new Date(),
			updated_at: new Date()
		}, function(err, rating) {
				if (err)
				{
					res.send({'error': 'An error has occurred'});
				}
				else
				{
					Rating.find(function(err, movies) {
						if (err)
						{
							res.send({'error': 'An error has occurred'});
						}
						else
						{
							res.json(movies);
						}
					});
				}
		});
	});

	app.put('/movies/:id', function(req, res) {
		const id = req.params.id;
		var data = {
			movie: req.body.movie,
			genre: req.body.genre,
			rate: req.body.rate,
			description: req.body.description,
			updated_at: new Date()
		};
		Rating.findByIdAndUpdate(id, data, function(err, rating) {
			if (err)
			{
				throw err;
			}
			else
			{
				res.send('Successfully updated ' + rating.movie);
			}
		});
	});
};