// routes/index.js

const movieRoutes = require('./movie_routes');

module.exports = function(app, db) {
	movieRoutes(app, db);
	// Other route groups go here, in the future
};