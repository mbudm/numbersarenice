import React, { useContext, useRef } from "react"
import { COMPLETE, GameContext, NUM_ROUNDS } from "./Game"

export const PlayScreen = () => {
  const {
    questions,
    answers,
    gameRound,
    setAnswers,
    setGameRound,
    setGameStatus,
  } = useContext(GameContext)

  const inputEl = useRef(null)

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
    const newAnswers = [...answers]
    if (gameRound === newAnswers.length) {
      newAnswers.push(event.target.value)
    } else {
      newAnswers[gameRound] = event.target.value
    }
    setAnswers(newAnswers)
  }
  const handleKeyUp = event => {
    if (event.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div>
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
