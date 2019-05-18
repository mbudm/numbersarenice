import React, { useContext } from "react"
import { hasLocalStorage }  from "../common/hasStorage"
import { LeaderBoard } from "../common/Leaderboard"
import { GAME_KEY, GameContext, NUM_ROUNDS, PLAY} from "./Game"

const generateQuestions = () =>
  Array.from({ length: NUM_ROUNDS }).map(() => ({
    // tslint:disable-next-line:insecure-random
    a: Math.ceil(Math.random() * 12),
    // tslint:disable-next-line:insecure-random
    b: Math.ceil(Math.random() * 12),
  }))

const getLeaderboardData = () => {
  let rows = []
  if(!hasLocalStorage()){
    return rows
  }
  try {
    const data = localStorage.getItem(GAME_KEY)
    rows = JSON.parse(data)
  } catch (e) {
    // No localstorage, or empty leaderboard
  }
  return rows
}

export const StartScreen = () => {
  const { setAnswers, setGameRound, setGameStatus, setQuestions } = useContext(
    GameContext
  )
  const leaderboardData = getLeaderboardData()
  const startGame = () => {
    setAnswers([])
    setGameRound(0)
    setQuestions(generateQuestions())
    setGameStatus(PLAY)
  }
  return (
    <div>
      <button onClick={startGame}>Start game</button>
      {leaderboardData && <LeaderBoard rows={leaderboardData} />}
    </div>
  )
}
