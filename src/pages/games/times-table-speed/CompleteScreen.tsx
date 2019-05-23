import * as React from "react"

import { hasLocalStorage } from "../common/hasStorage";
import { LeaderBoard } from "../common/Leaderboard";
import { GameContext, START } from "./Game"
import { gameTime } from "./gameTime";
import { getLeaderboardData, ILeaderboardEntry, updateLeaderboard } from "./getLeaderboardData";

const getGameLeaderboard = (gameData) => {
  if(!hasLocalStorage()){
    return []
  }
  const leaderboardData = getLeaderboardData()
  const gameIndex = leaderboardData.findIndex((l,i,arr) => {
    return l.score <= gameData.score && (!!(arr.length -1 > i) || arr[i+1] >= gameData.score)
  })
  const rowsBefore = gameIndex;
  const rowsAfter = Math.min(2, leaderboardData.length - gameIndex)
  return [
    ...leaderboardData.slice(gameIndex - rowsBefore, rowsBefore),
    gameData,
    ...leaderboardData.slice(gameIndex, rowsAfter)
  ]
}

export const CompleteScreen = () => {
  const {
    answers,
    difficulty,
    endTime,
    questions,
    score,
    setGameStatus,
    startTime
  } = React.useContext(
    GameContext
  )
  const [name, setName] = React.useState("")
  const resetGame = () => setGameStatus(START)

  const gameData: ILeaderboardEntry = {
    difficulty,
    endTime,
    name,
    score,
    startTime
  }

  const gameLeaderboardData = getGameLeaderboard(gameData)
  const editRow = gameLeaderboardData.findIndex((data) => gameData.startTime === data.startTime)

  const onEditLeaderboardEntry = (n) => {
    setName(n)
    updateLeaderboard({...gameData, name: n}) // useEffect
  }

  return (
    <div data-testid="complete-screen">
      <p>Time: <span data-testid="game-time">{gameTime(startTime, endTime)}</span> seconds.  Score <span data-testid="game-score">{score}</span></p>
      {gameLeaderboardData.length > 0 && <LeaderBoard rows={gameLeaderboardData} editRow={editRow} onEdit={onEditLeaderboardEntry}/>}
      <table data-testid="game-summary">
        <tbody>
          {questions.map((q, i) => (
            <tr key={`${i}-${q.a}x${q.b}`}>
              <td>{q.a}</td>
              <td>x</td>
              <td>{q.b}</td>
              <td>=</td>
              <td>{answers[i]}</td>
              <td>
                {answers[i] === `${q.a * q.b}`
                  ? "Correct"
                  : `Incorrect (${q.a * q.b})`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={resetGame} data-testid="reset-button">Play again</button>
    </div>
  )
}
