// routes/note_routes.js
var mongoose = require('mongoose');

var Rating = require('../../models/rating');


function makeList (movies) {
	var genreList = [];
	var temp = 0;
	for (var i=0; i<movies.length; i++)
	{
		for (var j=0; j<movies[i].genre.length; j++)
		{
			var bool = 0;
			for (var k=0; k<genreList.length;k++)
			{
				if (movies[i].genre[j]===genreList[k]) //genre already exists
				{
					bool = 1;
				}
			}
			if (bool === 0)
			{		
				genreList[temp] = movies[i].genre[j];
				temp++;
			}
		}
	}
	return genreList;
};

module.exports = function(app) {

	//index page
	app.get('/', function(req, res) {
		var sortParameter = {};
		var genreFind = {};
		console.log(req.query);
		if (req.query === null)
		{
			console.log('-----------empty');
		}
		else
		{
			console.log('-----------not empty');
			var sortMethod = req.query.sortMethod;
			var genreType = req.query.genreType;
			
			console.log("go:"+ genreType);
			if (genreType!="All-Genres")
			{
				genreFind = {genre: genreType};
			}
			console.log("gf" + genreFind);
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
			console.log("sp" + sortParameter);	
		}
		Rating.find(genreFind).sort(sortParameter).exec(function(err, movies) {
			if (err) {
				res.send({'error': 'An error has occurred'});
			}
			else {
				//res.render will look in views folder
				
				var genreList = makeList(movies);
				/*
				var genreList;
				Rating.find({}, {genre: 1, _id: 0}).exec(function(err, genres) {
					console.log(genres);
					genreList = genres;
				})
				console.log("gl" + genreList);
				*/
				//console.log(movies);
				//console.log(genreList);
				//console.log(genreList.length);
				res.render('pages/index', {list: movies, genreList: genreList});
			}
		});
	});

	/*
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
				var genreList = makeList(movies);
				//res.render will look in views folder
				res.render('pages/index', {list: movies, genreList: genreList});
			}
		});
	});
	*/

	/*
	app.get('/view/:view', function(req, res) {
		var viewOption = req.params.view;
		console.log(viewOption);
		Rating.find({genre: viewOption}).exec(function(err, movies) {
			if (err) {
				res.send({'error': 'An error has occurred'});
			}
			else {
				console.log(movies);
				//res.render will look in views folder
				res.render('pages/index', {list: movies});
			}
		});
	});
	*/

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
};