//Copyright 2022 under MIT License
const express = require('express');
const router = express.Router();
const { Pool } = require( "pg" )

const credentials = {
	user: "postgres",
	host: "localhost",
	database: "CodingExam",
	password: "password",
	port: 5432
}

/* GET users listing. */
router.get('/questions', async function(req, res, next) {
  	const pool = new Pool(credentials)

	const results = await pool.query( `
		SELECT *
		FROM "CodingExam".ExamQuestion EQ
		INNER JOIN "CodingExam".QuestionAnswer QA ON QA.QuestionID = EQ.QuestionID
		WHERE ExamID = ${req.headers.examid}
		ORDER BY QA.AnswerIndex
	`)

	await pool.end()

	res.send( {
		id: results.rows[0].questionid,
		text: results.rows[0].questiontext,
		answers: results.rows.map( row => row.answertext )
	} )
});

router.post('/', async (req, res) => {
	const pool = new Pool(credentials)

	await pool.query( `
		INSERT INTO "CodingExam".StudentResponse(IsTextResponse, AnswerResponse, QuestionID)
		VALUES (FALSE, ${req.body.answer}, ${req.body.questionID});
	` )

	const results = await pool.query( `
		SELECT *
		FROM "CodingExam".StudentResponse
		WHERE QuestionID = ${req.body.questionID};
	` )

	await pool.end()

	res.send({
		answer: `You requested: ${results.rows[results.rows.length - 1].answerresponse}`
	})
});

module.exports = router;
