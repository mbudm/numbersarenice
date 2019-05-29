import Card from "@material-ui/core/Card";
import * as React from "react";

import { CompleteScreen } from "./CompleteScreen";
import { COMPLETE, PLAY, START } from "./constants";
import { GameHeader } from "./GameHeader";
import { PlayScreen } from "./PlayScreen";
import { initialState, reducer } from "./reducer";
import { StartScreen } from "./StartScreen";

export const GameContext = React.createContext(null);

const gameScreens = {
  [START]: (<StartScreen />),
  [PLAY]: (<PlayScreen />),
  [COMPLETE]: (<CompleteScreen />)
};

export const Game = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{
      dispatch,
      state,
    }}>
      <Card style={{ padding: 50 }}>
        <GameHeader />
        {gameScreens[state.status]}
      </Card>
    </GameContext.Provider>
  );
};
