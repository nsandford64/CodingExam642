const express = require('express');
const router = express.Router();
const { Pool } = require( "pg" )

/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.send( req )
});

router.post('/', async (req, res) => {
	const credentials = {
		user: "postgres",
		host: "localhost",
		database: "CodingExam",
		password: "password",
		port: 5432
	}

	const pool = new Pool(credentials)
	const now = await pool.query( "SELECT * FROM \"CodingExam\".Exam" )
	await pool.end()

	console.log( now.rows )

	res.send({
		answer: `You requested: ${req.body.answer}`
	})
});

module.exports = router;
