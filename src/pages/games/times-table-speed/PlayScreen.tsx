import * as React from "react"
import { GameContext } from "./Game"
import { actions } from "./reducer";


interface IQuestion {
  a: number,
  b: number
}

export const PlayScreen = () => {
  const {
    dispatch,
    state
  } = React.useContext(GameContext)

  const [submitDisabled, setSubmitDisabled] = React.useState(true)
  const [answer, setAnswer] = React.useState('')

  const inputEl = React.useRef(null)
  const submitEl = React.useRef(null)

  const question = state.questions[state.round]

  const handleSubmit = () => {
    inputEl.current.focus()
    setSubmitDisabled(true)
    dispatch({ type: actions.SUBMIT_ANSWER, payload: answer})
    setAnswer("")
  }

  const handleChange = event => {
    const {value} = event.target
    if(!Number.isInteger(Number.parseInt(value, 10))){
      return
    }
    setSubmitDisabled(false)
    setAnswer(event.target.value)
  }
  const handleKeyUp = event => {
    if (event.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div data-testid="play-screen">
      <p>
        <span data-testid="question-a">{question.a}</span> x
        <span data-testid="question-b">{question.b}</span> =
        <input
          autoFocus={true}
          placeholder="?"
          value={answer}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          ref={inputEl}
          data-testid="answer"
        />
      </p>
      <button
        data-testid="answer-submit"
        onClick={handleSubmit}
        ref={submitEl}
        disabled={submitDisabled}
      >Submit</button>
    </div>
  )
}
