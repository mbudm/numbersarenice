import React from "react";
export const CompleteScreen = ({ resetGame, questions, answers, time }) => (<div>
  <p> Time: {time / 1000} seconds</p>
  <table>
    {questions.map((q, i) => (<tr key={`${i}-${q.a}x${q.b}`}>
      <td>{q.a}</td>
      <td>x</td>
      <td>{q.b}</td>
      <td>=</td>
      <td>{answers[i]}</td>
      <td>{answers[i] === `${q.a * q.b}` ? "Correct" : `Incorrect (${q.a * q.b})`}</td>
    </tr>))}
  </table>
  <button onClick={resetGame}>Game complete. Reset game</button>
</div>);
