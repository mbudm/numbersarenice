import * as React from "react"

import {
  Button,
} from "@material-ui/core"

import { Leaderboard } from "../common/leaderboard/Leaderboard"
import {
  GAME_KEY,
} from "./constants"
import { GameContext } from "./Game"
import { GameSettings } from "./GameSettings";
import { actions } from "./reducer"



export const StartScreen = () => {
  const { dispatch, state } = React.useContext(GameContext)
  const startGame = () => {
    dispatch({ type: actions.START_GAME })
  }

  return (
    <div data-testid="start-screen">
      <p>
        Test your times table skills against the clock! Adjust the difficullty
        and number of rounds to learn your multiplication tables and have fun.
      </p>
      <GameSettings />
      <p>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth={true}
          onClick={startGame}
          data-testid="start-button"
        >
          Play New Game
        </Button>
      </p>
      <Leaderboard storageKey={GAME_KEY} />
    </div>
  )
}
