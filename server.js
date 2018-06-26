// server.js

/*
	CRUDdy ROutes
	1. CREATE a note
	2. READ your notes
	3. UPDATE a note
	4. DELETE a note
*/
const express = require('express');
const MongoClient = require('mongodb').MongoClient; //interact with database
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
	if (err) return console.log(err);
	require('./app/routes')(app, database);
	app.listen(port, () => {
		console.log('We are live on ' + port);
	});
});