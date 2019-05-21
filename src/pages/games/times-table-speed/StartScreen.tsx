import * as React from "react";

import { LeaderBoard } from "../common/Leaderboard"
import { GameContext, NUM_ROUNDS, PLAY} from "./Game"
import { getLeaderboardData, resetLeaderboard } from "./getLeaderboardData";

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
  const [leaderboardData, setLeaderboarData] = React.useState(getLeaderboardData())
  const startGame = () => {
    setAnswers([])
    setGameRound(0)
    setQuestions(generateQuestions())
    setGameStatus(PLAY)
  }
  const onResetLeaderboard = () => {
    setLeaderboarData([])
    resetLeaderboard()
  }
  return (
    <div>
      <button onClick={startGame}>Start game</button>
      {leaderboardData.length > 0 &&
        <p>
          <LeaderBoard rows={leaderboardData} />
          <a onClick={onResetLeaderboard} >Reset leaderboard</a>
        </p>
      }
    </div>
  )
}
