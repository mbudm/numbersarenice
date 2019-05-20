import React, { useContext, useState } from "react"

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
  return [
    ...leaderboardData.slice(gameIndex -2, 2),
    gameData,
    ...leaderboardData.slice(gameIndex, 2)
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
  } = useContext(
    GameContext
  )
  const [name, setName] = useState("")
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
    <div>
      <p> Time: {gameTime(startTime, endTime)} seconds.  Score {score}</p>
      {gameLeaderboardData.length > 0 && <LeaderBoard rows={gameLeaderboardData} editRow={editRow} onEdit={onEditLeaderboardEntry}/>}
      <table>
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
      </table>
      <button onClick={resetGame}>Game complete. Reset game</button>
    </div>
  )
}
