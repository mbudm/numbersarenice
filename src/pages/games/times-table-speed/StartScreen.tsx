import * as React from "react";

import { Leaderboard } from "../common/leaderboard/Leaderboard"
import { GAME_KEY } from "./constants";
import { GameContext} from "./Game"
import { actions } from "./reducer";



export const StartScreen = () => {
  const { dispatch } = React.useContext(
    GameContext
  )
  const startGame = () => {
    dispatch({type: actions.START_GAME})
  }

  return (
    <div data-testid="start-screen">
      <button onClick={startGame} data-testid="start-button">Start game</button>
      <Leaderboard storageKey={GAME_KEY} />
    </div>
  )
}
