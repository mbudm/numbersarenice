import * as React from "react"

import { hasLocalStorage } from "../common/hasStorage";
import { LeaderBoard } from "../common/Leaderboard";
import { GameContext, START } from "./Game"
import { gameTime } from "./gameTime";
import { getLeaderboardData, ILeaderboardEntry, sortByScore, updateLeaderboard } from "./getLeaderboardData";

const LEADERBOARD_DISPLAY_LENGTH = 5

export const getGameIndex = (
  gameData: ILeaderboardEntry,
  leaderboardData: ILeaderboardEntry[]
) => {
  const index = leaderboardData.findIndex((l) => l === gameData)
  return index < 0 ? leaderboardData.length : index
}

export const getLeaderboardAtGamePosition = (gameData, leaderboardData) => {
  const leaderboardDataWithGameData = sortByScore([...leaderboardData, gameData])
  const gameIndex = getGameIndex(gameData, leaderboardDataWithGameData)

  let gameLeaderboardAtGamePosition

  if(leaderboardDataWithGameData.length <= LEADERBOARD_DISPLAY_LENGTH){
    gameLeaderboardAtGamePosition = leaderboardDataWithGameData
  }else{
    const idealRows = (LEADERBOARD_DISPLAY_LENGTH - 1) / 2 // ideally we have equal before and after rows to show context
    const afterGap = leaderboardData.length - gameIndex // slots after the game index
    const beforeGap = gameIndex // slots before the gameIndex
    const rowsBefore = afterGap < idealRows ? idealRows + (idealRows - afterGap) : Math.min(idealRows, beforeGap) // if there isn't enough rows after then show more before
    const rowsAfter = beforeGap < idealRows ? idealRows + (idealRows - beforeGap) : Math.min(idealRows, afterGap) // if there isnt enough before then show more after
    gameLeaderboardAtGamePosition = leaderboardDataWithGameData.slice(gameIndex - rowsBefore, gameIndex + rowsAfter + 1); // slice from the  rowsBefore the game data index to after the gameIndex plus rows after
  }

  return gameLeaderboardAtGamePosition
}

const getGameLeaderboard = (gameData) => {
  if(!hasLocalStorage()){
    return []
  }
  const leaderboardData = getLeaderboardData()
  return getLeaderboardAtGamePosition(gameData, leaderboardData)
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
