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

var gl;
Rating.find().exec(function(err, movies){
	gl = makeList(movies);
	makeGlobal();
	return;
});

function makeGlobal() //makes gl a global variable
{
}

module.exports = function(app) {

	//index page
	app.get('/', function(req, res) {
		var sortParameter = {movie: 'ascending'};
		var genreFind = {};
		var sortMethod;
		var genreType;
		if (typeof req.query.sortMethod == 'undefined' && typeof req.query.genreType == 'undefined')
		{
			console.log('-----------empty');
		}
		else
		{
			console.log('-----------not empty');
			sortMethod = req.query.sortMethod;
			genreType = req.query.genreType;
			
			if (genreType!="All-Genres")
			{
				genreFind = {genre: genreType.replace(/\-/g, " ")}
			}
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
		}
		Rating.find(genreFind).sort(sortParameter).exec(function(err, movies) {
			if (err) {
				res.send({'error': 'An error has occurred'});
			}
			else {
				//res.render will look in views folder
				if (typeof req.query.sortMethod == 'undefined' && typeof req.query.genreType == 'undefined')
				{
					sortMethod = '-1';
					genreType = '-1';
				}
				res.render('pages/index', {list: movies, genreList: gl, sortMethod: sortMethod, genreType: genreType});
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