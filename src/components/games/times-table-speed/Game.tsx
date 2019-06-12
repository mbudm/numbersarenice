import Card from "@material-ui/core/Card";
import * as React from "react";

import { CardContent } from "@material-ui/core";
import { CompleteScreen } from "./CompleteScreen";
import { COMPLETE, PLAY, START } from "./constants";
import { effects } from "./effects"
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

export const Game = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  effects(state, props)

  return (
    <GameContext.Provider value={{
      dispatch,
      state,
    }}>
      <Card>
        <CardContent>
          <GameHeader />
          {gameScreens[state.status]}
        </CardContent>
      </Card>
    </GameContext.Provider>
  );
};
