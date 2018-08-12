// routes/note_routes.js
var mongoose = require('mongoose');

var Rating = require('../../models/rating');

module.exports = function(app) {

	//index page
	app.get('/', function(req, res) {
		Rating.find({}).sort({movie: 'ascending'}).exec(function(err, movies) {
			if (err) {
				res.send({'error': 'An error has occurred'});
			}
			else {
				//res.render will look in views folder
				res.render('pages/index', {list: movies});
			}
		});
	});

	app.get('/:sortMethod', function(req, res) {
		console.log("in server");
		const sortMethod = req.params.sortMethod;
		var sortParameter;
		if (sortMethod === "md") //sort by movie descending
		{
			sortParameter = {movie: 'descending'};
		}
		else if (sortMethod === "ma") //sort by movie name ascending
		{
			sortParameter = {movie: 'ascending'};
		}
		else if (sortMethod === "rd") //sort by rate descending
		{
			sortParameter = {rate: 'descending'};
		}
		else if (sortMethod === "ra") //sort by rate ascending
		{
			sortParameter = {rate: 'ascending'};
		}
		console.log(sortParameter);
		Rating.find({}).sort(sortParameter).exec(function(err, movies) {
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
		var id = req.params.id;
		Rating.findById(id).remove(function(err, data) {
			if (err) {
				res.send({'error': 'An error has occurred'});
			}
			else {
				console.log("deleted. "+ id);
				res.json(data);
			}
		});
		/*
		Rating.find({movie: req.params.title.replace(/\-/g, " ")}).remove(function(err, data) {
			if (err) {
				res.send({'error': 'An error has occurred'});
			}
			else {
				console.log("deleted.");
				res.json(data);
			}
		});
		*/
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
				console.log('created rating');
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
							res.json(rating);
						}
					});
				}
		});
	});


	app.get('/edit/:id', function(req, res) {
		var id = req.params.id;
		Rating.findById(id, function(err, data) {
			if (err) {
				console.log("error");
				res.send({'error': 'An error has occurred'});
			}
			else {
				//res.render will look in views folder
				console.log(data);
				res.render('pages/edit', {rating: data});
			}
		});
	});

	app.put('/edit/:id', function(req, res) {
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

	/*
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
	*/
};