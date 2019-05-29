import * as React from "react";

import { GameContext } from "./Game";

export const GameHeader = () => {
  const { state } = React.useContext(GameContext);
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
      <dd>{state.status}</dd>
      <dt>gameRound</dt>
      <dd>{state.round}</dd>
      <dt>startTime</dt>
      <dd>{state.gameData.startTime}</dd>
      <dt>endTime</dt>
      <dd>{state.gameData.endTime}</dd>
      <dt>answers</dt>
      <dd>{state.answers.length}</dd>
    </dl>
  </>);
};
