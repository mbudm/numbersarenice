import * as React from "react"

import { Box, Button, makeStyles } from "@material-ui/core";
import { Link } from "gatsby"

import { gameTime } from "../common/gameTime";
import { Leaderboard } from "../common/leaderboard/Leaderboard";
import { GAME_KEY } from "./constants";
import { GameContext } from "./Game"
import { actions } from "./reducer";


const useStyles = makeStyles(() => ({
  details: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
    marginBottom:20
  },
  feedback: {
    background: "none",
    fontSize: 24,
    textAlign: "center",
  },
  reset: {
    marginBottom: "1em"
  },
  stat: {
    fontSize: 64,
    lineHeight:1.5,
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  statBox: {
    alignItems: "center",
    display: 'flex',
    margin: "0 20px",
  },
  statLabel: {
    lineHeight:3,
    padding:"0 0.2em"
  },
  summary: {
    alignContent: "space-between",
    alignItems: "center",
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
    marginBottom: "10px",
  },
}))

export const CompleteScreen = () => {
  const {
    dispatch,
    state
  } = React.useContext(
    GameContext
  )

  const classes = useStyles({})

  const resetGame = () => dispatch({type: actions.RESET_GAME})

  const [showDetails, setShowDetails] = React.useState(false)
  const handleDetails = () => setShowDetails(!showDetails)
  /*
  change leaderboard title to be 'Save your score' in edit mode.
  hide table rows on small screen
  */

  const feedback = state.gameData.score >= 80 ?
    (<Feedback.Great />) :
    (state.gameData.score >= 60 ?
      (<Feedback.Ok />) :
      (<Feedback.Bad />)
    )
  return (
    <div data-testid="complete-screen">
      <div className={classes.summary}>
        <span className={classes.statBox}>
          <span className={classes.statLabel}>Time:</span>
          <span
            className={classes.stat}
            data-testid="game-time"
            >
            {gameTime(state.gameData.startTime, state.gameData.endTime)}
          </span>
          <span className={classes.statLabel}>seconds.</span>
        </span>
        <span className={classes.statBox}>
          <span className={classes.statLabel}>Score: </span>
          <span
            className={classes.stat}
            data-testid="game-score">
            {state.gameData.score}
          </span>
          <span className={classes.statLabel}>%</span>
        </span>
      </div>
      <div className={classes.details}>
        <Button onClick={handleDetails} data-testid="game-summary-toggle" >{showDetails ? "Hide" : "View" } game details</Button>
        {showDetails && <GameDetails />}
      </div>
      <Button
        onClick={resetGame}
        data-testid="reset-button"
        variant="contained"
        color="primary"
        size="large"
        fullWidth={true}
        className={classes.reset}
      >Play again</Button>
      <div className={classes.feedback}>
        {feedback}
      </div>
      <Leaderboard storageKey={GAME_KEY} newGame={state.gameData}/>
    </div>
  )
}


const GameDetails = () => {
  const {
    state
  } = React.useContext(
    GameContext
  )
  return (
    <table data-testid="game-summary">
      <tbody>
        {state.questions.map((q, i) => (
          <tr key={`${i}-${q.a}x${q.b}`}>
            <td>{q.a}</td>
            <td>x</td>
            <td>{q.b}</td>
            <td>=</td>
            <td>{state.answers[i]}</td>
            <td>
              {state.answers[i] === q.a * q.b
                ? "Correct"
                : `Incorrect (${q.a * q.b})`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}


const Feedback = {
  Bad: () => (<p>Not the best score ever. Maybe one of <Link to="/" >our posters</Link> on your wall might help you practice?</p>),
  Great: () => (<p>Math genius alert! Well done.</p>),
  Ok: () => (<p>Good work, but do you think you can beat your score? Why not have another go?</p>),
}
