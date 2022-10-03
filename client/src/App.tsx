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

	const [ answers, setAnswers ] = React.useState( [] as number[] )
	const [ state, setState ] = React.useState( "" )

	const callApi = React.useCallback( async () => {
		const res = await fetch( "http://localhost:9000/api/test", {
			// Adding method type
			method: "POST",
     
			// Adding body or contents to send
			body: JSON.stringify({
				answer: answers[0]
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
			<TrueFalse
				question="What's the best programming language?"
				answers={[
					"C#",
					"C",
					"TypeScript",
					"Fortran"
				]}
				setAnswer={setAnswer}
			/>
			<Button intent={Intent.PRIMARY} onClick={callApi} text="Submit" />
		</StyledApp>
	)
} )
App.displayName = "App"

export default App
