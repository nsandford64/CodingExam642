//Copyright 2022 under MIT License
const express = require('express');
const router = express.Router();
const { Pool } = require( "pg" )

/* Sample credentials for PostGres database */
const credentials = {
	user: "postgres",
	host: "localhost",
	database: "CodingExam",
	password: "password",
	port: 5432
}

/**
 * Get a list of questions from the requested examid
 */
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

	/* Sends a question object to the requester */
	res.send( {
		id: results.rows[0].questionid,
		text: results.rows[0].questiontext,
		answers: results.rows.map( row => row.answertext )
	} )
});

/**
 * Inserts an answer into the StudentResponse table in the database
 */
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

	/* Respond a success message to the poster */
	res.send({
		answer: `You requested: ${results.rows[results.rows.length - 1].answerresponse}`
	})
});

module.exports = router;
