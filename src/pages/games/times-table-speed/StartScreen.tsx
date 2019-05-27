import * as React from "react";

import { Leaderboard } from "../common/Leaderboard"
import { GAME_KEY, GameContext, NUM_ROUNDS, PLAY} from "./Game"

const generateQuestions = () =>
  Array.from({ length: NUM_ROUNDS }).map(() => ({
    // tslint:disable-next-line:insecure-random
    a: Math.ceil(Math.random() * 12),
    // tslint:disable-next-line:insecure-random
    b: Math.ceil(Math.random() * 12),
  }))

export const StartScreen = () => {
  const { setAnswers, setGameRound, setGameStatus, setQuestions } = React.useContext(
    GameContext
  )
  const startGame = () => {
    setAnswers([])
    setGameRound(0)
    setQuestions(generateQuestions())
    setGameStatus(PLAY)
  }

  return (
    <div data-testid="start-screen">
      <button onClick={startGame} data-testid="start-button">Start game</button>
      <Leaderboard storageKey={GAME_KEY} />
    </div>
  )
}
