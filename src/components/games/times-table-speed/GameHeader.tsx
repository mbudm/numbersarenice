import * as React from "react";

import { GameContext } from "./Game";

export const GameHeader = () => {
  const { state } = React.useContext(GameContext);
  return (<>
    <h1 style={{
      color:"#999997",
      marginBottom: 30,
      marginLeft: 50,
      marginRight: 30,
      marginTop: 10,
      textAlign: "center",
    }}>
      <em>Speed Tables</em>
    </h1>
  </>);
};
