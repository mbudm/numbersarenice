import * as React from "react"
import { COMPLETE, GameContext, NUM_ROUNDS } from "./Game"


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

  const inputEl = React.useRef(null)

  const answer = answers[gameRound] || ""
  const question = questions[gameRound]

  const handleSubmit = () => {
    if (answers.length <= gameRound) {
      return
    }
    if (answers.length < NUM_ROUNDS) {
      inputEl.current.focus()
      setGameRound(gameRound + 1)
    } else {
      setGameStatus(COMPLETE)
    }
  }

  const handleChange = event => {
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
        {question.a} x {question.b} =
        <input
          autoFocus={true}
          placeholder="?"
          value={answer}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          ref={inputEl}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
