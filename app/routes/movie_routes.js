// routes/note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	app.get('/movies/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('movies').findOne(details, (err, item) => {
			if (err) {
				res.send({'error': 'An error has occurred'});
			}
			else {
				//res.send(item);
				res.send("<html><body><h1>" + item.text + "</h1><p>" + item.rate + "</p></body></html>");
			}
		});
	});

	app.delete('/movies/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('movies').remove(details, (err, item) => {
			if (err) {
				res.send({'error': 'An error has occurred'});
			}
			else {
				res.send('Movie ' + id + ' deleted.');
			}
		});
	});

	app.post('/movies', (req, res) => {
		const rating = { movie: req.body.movie, genre: req.body.genre, rate: req.body.rating, description: req.body.description };
		db.collection('movies').insert(rating, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			}
			else {
				res.send(result.ops[0]);
			}
		});
	});

	app.put('/movies/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		const rating = { movie: req.body.movie, genre: req.body.genre, rate: req.body.rating, description: req.body.description };
		db.collection('movies').update(details, rating, (err, result) => {
			if (err) {
				res.send({'error': 'An error has occurred'});
			}
			else {
				res.send(rating);
			}
		});
	});
};