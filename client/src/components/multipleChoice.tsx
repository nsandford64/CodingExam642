//Copyright 2022 under MIT License
import { Radio, RadioGroup } from "@blueprintjs/core"
import * as React from "react"
import styled from "styled-components"

/**
 * Props for MultipleChoice component
 */
interface MultipleChoiceProps {
    question: string
    answers: string[]
    setAnswer: (index: number ) => void
}

/**
 * Style to wrap the MultipleChoice component
 */
const StyledMultipleChoice = styled.div`
    padding: 20px;
`

/**
 * MultipleChoice component
 * 
 * This component presents the student with a question and 
 * gives them multiple answer options based on the incoming
 * "answers" prop. 
 */
export const MultipleChoice = React.memo( ( props: MultipleChoiceProps ) => {

	/* Keeps track of the index that is currently selected */
	const [ index, setIndex ] = React.useState( -1 )

	/* Updates the index selected by the user */
	const handleChange = React.useCallback( ( e: React.FormEvent<HTMLInputElement> )  => {
		const value = parseInt( (e.target as HTMLInputElement).value )

		setIndex( value )
		props.setAnswer( value )
	}, [props] )

	/* Render the component */
	return (
		<StyledMultipleChoice>
			<RadioGroup
				label={props.question}
				onChange={handleChange}
				selectedValue={index}
			>
				{props.answers.map( ( answer, index ) => (
					<Radio key={index} label={answer} value={index} />
				) )}
			</RadioGroup>
		</StyledMultipleChoice>
	)
} )
MultipleChoice.displayName = "MultipleChoice"
