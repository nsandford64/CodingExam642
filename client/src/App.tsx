//Copyright 2022 under MIT License
import React from "react"
import { Button, Intent } from "@blueprintjs/core"
import styled from "styled-components"
import { TrueFalse } from "./components/trueFalse"

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const App = React.memo(() => {
	const [ questionID, setQuestionID ] = React.useState( -1 )
	const [ questions, setQuestions ] = React.useState( [] as Question[] )
	const [ answers, setAnswers ] = React.useState( [] as number[] )
	const [ state, setState ] = React.useState( "" )

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

	const setAnswer = React.useCallback( ( answer: number ) => {
		const newState = [answer]

		setAnswers( newState )
	}, [] )

	return (
		<StyledApp>
			<h1>{state}</h1>
			{questions.map( ( question, index ) => (
				<TrueFalse
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

type Question = {
	id: number
	text: string
	answers: string[] 
}