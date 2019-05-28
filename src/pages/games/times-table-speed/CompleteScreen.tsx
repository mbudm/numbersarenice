import * as React from "react"

import { Leaderboard } from "../common/Leaderboard";
import { GAME_KEY, GameContext, START } from "./Game"
import { gameTime } from "./gameTime";

export const CompleteScreen = () => {
  const {
    answers,
    gameData,
    questions,
    setGameStatus,
  } = React.useContext(
    GameContext
  )
  const resetGame = () => setGameStatus(START)

  return (
    <div data-testid="complete-screen">
      <p>
        Time: <span data-testid="game-time">{gameTime(gameData.startTime, gameData.endTime)}</span> seconds.
        Score <span data-testid="game-score">{gameData.score}</span>%</p>
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
