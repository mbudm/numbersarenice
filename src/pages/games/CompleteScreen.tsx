import React, { useContext } from "react"

import { GameContext, START } from "./Game"

export const CompleteScreen = () => {
  const { questions, answers, setGameStatus, endTime, startTime } = useContext(
    GameContext
  )
  const resetGame = () => setGameStatus(START)
  const time = endTime - startTime
  return (
    <div>
      <p> Time: {time / 1000} seconds</p>
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
