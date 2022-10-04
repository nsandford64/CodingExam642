//Copyright 2022 under MIT License
import { Radio, RadioGroup } from "@blueprintjs/core"
import * as React from "react"
import styled from "styled-components"

interface TrueFalseProps {
    question: string
    answers: string[]
    setAnswer: (index: number ) => void
}

const StyledTrueFalse = styled.div`
    padding: 20px;
`

export const TrueFalse = React.memo( ( props: TrueFalseProps ) => {

	const [ index, setIndex ] = React.useState( -1 )

	const handleChange = React.useCallback( ( e: React.FormEvent<HTMLInputElement> )  => {
		const value = parseInt( (e.target as HTMLInputElement).value )

		setIndex( value )
		props.setAnswer( value )
	}, [props] )

	return (
		<StyledTrueFalse>
			<RadioGroup
				label={props.question}
				onChange={handleChange}
				selectedValue={index}
			>
				{props.answers.map( ( answer, index ) => (
					<Radio key={index} label={answer} value={index} />
				) )}
			</RadioGroup>
		</StyledTrueFalse>
	)
} )
TrueFalse.displayName = "TrueFalse"
