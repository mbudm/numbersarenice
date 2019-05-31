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
      Speed Tables
    </h1>
  </>);
};
