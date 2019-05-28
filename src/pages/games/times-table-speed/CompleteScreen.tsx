import * as React from "react"

import { ILeaderboardEntry } from "../common/getLeaderboardData";
import { Leaderboard } from "../common/Leaderboard";
import { GAME_KEY, GameContext, START } from "./Game"
import { gameTime } from "./gameTime";

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
  const resetGame = () => setGameStatus(START)

  // this needs to go in state and update if any of the properties change - endTime for eg
  const gameData: ILeaderboardEntry = {
    difficulty,
    endTime,
    name: "",
    score,
    startTime
  }

  return (
    <div data-testid="complete-screen">
      <p>
        Time: <span data-testid="game-time">{gameTime(startTime, endTime)}</span> seconds.
        Score <span data-testid="game-score">{score}</span>%</p>
      <Leaderboard storageKey={GAME_KEY} newGame={gameData}/>
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
                {answers[i] === q.a * q.b
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
