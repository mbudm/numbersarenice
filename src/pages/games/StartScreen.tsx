import React, { useContext } from "react"
import { GameContext, NUM_ROUNDS, PLAY } from "./Game"

const generateQuestions = () =>
  Array.from({ length: NUM_ROUNDS }).map(() => ({
    // tslint:disable-next-line:insecure-random
    a: Math.ceil(Math.random() * 12),
    // tslint:disable-next-line:insecure-random
    b: Math.ceil(Math.random() * 12),
  }))

export const StartScreen = () => {
  const { setAnswers, setGameRound, setGameStatus, setQuestions } = useContext(
    GameContext
  )
  const startGame = () => {
    setAnswers([])
    setGameRound(0)
    setQuestions(generateQuestions())
    setGameStatus(PLAY)
  }
  return (
    <div>
      <button onClick={startGame}>Start game</button>
    </div>
  )
}
