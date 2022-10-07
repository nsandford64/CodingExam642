//Copyright 2022 under MIT License
import React from "react"
import { Button, Intent } from "@blueprintjs/core"
import styled from "styled-components"
import { MultipleChoice } from "./components/multipleChoice"

/**
 * Style to wrap the App component
 */
const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

/**
 * App Component
 * 
 * This is the main driving App. It pulls in data from the database
 * and allows the user to take the test.
 */
const App = React.memo(() => {

	/* ID of the question currently working on */
	const [ questionID, setQuestionID ] = React.useState( -1 )
	/* List of questions in the exam */
	const [ questions, setQuestions ] = React.useState( [] as Question[] )
	/* List of answers for the given question */
	const [ answers, setAnswers ] = React.useState( [] as number[] )
	/* State for debugging that allows us to see results from database */
	const [ state, setState ] = React.useState( "" )

	/* On mount, this queries the database for a list of questions */
	React.useEffect( () => {
		const initQuestions = async () => {
			const data = await fetch( "http://localhost:9000/api/questions", {
				headers: {
					"examID": "1"
				} 
			} )

			const question: Question = await data.json()

			setQuestionID( question.id )
			setQuestions( prev => [...prev, question] )
		}

		initQuestions()
	}, [] )

	/* Posts to the database once the user clicks the submit button */
	const submit = React.useCallback( async () => {
		const res = await fetch( "http://localhost:9000/api", {
			// Adding method type
			method: "POST",
     
			// Adding body or contents to send
			body: JSON.stringify({
				answer: answers[0],
				questionID: questionID
			}),
     
			// Adding headers to the request
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		} )

		const json = await res.json()

		setState(json.answer)

	}, [answers] )

	/* Sets the answer state */
	const setAnswer = React.useCallback( ( answer: number ) => {
		const newState = [answer]

		setAnswers( newState )
	}, [] )

	/* Renders the component */
	return (
		<StyledApp>
			<h1>{state}</h1>
			{questions.map( ( question, index ) => (
				<MultipleChoice
					key={index}
					question={question.text || ""}
					answers={question.answers || []}
					setAnswer={setAnswer}
				/>
			))}
			<Button intent={Intent.PRIMARY} onClick={submit} text="Submit" />
		</StyledApp>
	)
} )
App.displayName = "App"

export default App

/**
 * Question type for parsing the json that comes from the database
 */
type Question = {
	id: number
	text: string
	answers: string[] 
}