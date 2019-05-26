import * as React from "react";

import { GameContext } from "./Game";

export const GameHeader = () => {
  const { answers, gameRound, gameStatus, startTime } = React.useContext(GameContext);
  return (<>
    <h1 style={{
      marginBottom: 30,
      marginLeft: 30,
      marginRight: 30,
      marginTop: 0,
      textAlign: "center",
    }}>
      Speed times table game
        </h1>
    <dl>
      <dt>gameStatus</dt>
      <dd>{gameStatus}</dd>
      <dt>gameRound</dt>
      <dd>{gameRound}</dd>
      <dt>startTime</dt>
      <dd>{startTime}</dd>
      <dt>answers</dt>
      <dd>{answers.length}</dd>
    </dl>
  </>);
};
