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
    <div data-testid="start-screen">
      <button onClick={startGame} data-testid="start-button">Start game</button>
      {leaderboardData.length > 0 &&
        <>
          <LeaderBoard rows={leaderboardData} />
          <p>
            <a onClick={onResetLeaderboard} data-testid="reset-leaderboard-anchor">Reset leaderboard</a>
          </p>
        </>
      }
    </div>
  )
}
