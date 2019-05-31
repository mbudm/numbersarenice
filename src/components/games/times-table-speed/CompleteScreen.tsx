import * as React from "react"

import { gameTime } from "../common/gameTime";
import { Leaderboard } from "../common/leaderboard/Leaderboard";
import { GAME_KEY } from "./constants";
import { GameContext } from "./Game"
import { actions } from "./reducer";

export const CompleteScreen = () => {
  const {
    dispatch,
    state
  } = React.useContext(
    GameContext
  )
  const resetGame = () => dispatch({type: actions.RESET_GAME})
  return (
    <div data-testid="complete-screen">
      <p>
        Started at: {state.gameData.startTime} finished at {state.gameData.endTime}.<br />
        Time: <span data-testid="game-time">{gameTime(state.gameData.startTime, state.gameData.endTime)}</span> seconds.
        Score <span data-testid="game-score">{state.gameData.score}</span>%</p>
      <Leaderboard storageKey={GAME_KEY} newGame={state.gameData}/>
      <table data-testid="game-summary">
        <tbody>
          {state.questions.map((q, i) => (
            <tr key={`${i}-${q.a}x${q.b}`}>
              <td>{q.a}</td>
              <td>x</td>
              <td>{q.b}</td>
              <td>=</td>
              <td>{state.answers[i]}</td>
              <td>
                {state.answers[i] === q.a * q.b
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
