import * as React from "react"
import { GameContext, NUM_ROUNDS, SCORING } from "./Game"


interface IQuestion {
  a: number,
  b: number
}

interface IPlayScreenContext {
  questions: IQuestion[]
  answers: number[]
  gameRound: number
  setAnswers: (answers: number[]) => void
  setGameRound: (gameRound:number) => void
  setGameStatus: (gameStatus:string) => void
}
export const PlayScreen = () => {
  const {
    questions,
    answers,
    gameRound,
    setAnswers,
    setGameRound,
    setGameStatus,
  }: IPlayScreenContext = React.useContext(GameContext)

  const [submitDisabled, setSubmitDisabled] = React.useState(true)

  const inputEl = React.useRef(null)
  const submitEl = React.useRef(null)

  const answer = answers[gameRound] || ""
  const question = questions[gameRound]

  const handleSubmit = () => {
    if (answers.length <= gameRound) {
      return
    }
    if (answers.length < NUM_ROUNDS) {
      inputEl.current.focus()
      setSubmitDisabled(true)
      setGameRound(gameRound + 1)
    } else {
      setGameStatus(SCORING)
    }
  }

  const handleChange = event => {
    const {value} = event.target
    if(!Number.isInteger(Number.parseInt(value, 10))){
      return
    }
    setSubmitDisabled(false)

    const newAnswers:number[] = [...answers]
    if (gameRound === newAnswers.length) {
      newAnswers.push(event.target.value * 1)
    } else {
      newAnswers[gameRound] = event.target.value * 1
    }
    setAnswers(newAnswers)
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
