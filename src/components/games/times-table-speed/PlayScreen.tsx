import { Box, Button, TextField, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import * as React from "react"
import THEME from "../../../theme"
import { GameContext } from "./Game"
import { actions } from "./reducer"

interface IQuestion {
  a: number
  b: number
}

const useStyles = makeStyles(() => ({
  answer: {
    "&::placeholder": {
      color: "#aaa"
    },
    background: "none",
    border: "1px solid #eee",
    fontSize: 64,
    fontWeight: "bold",
    textAlign: "center",
    width: "3em",
  },
  argument: {
    fontSize: 64,
    lineHeight:1.5,
    textAlign: "center",
    width: "1em",
  },
  operator: {
    color: "#999",
    fontSize: 36,
    lineHeight:3,
    textAlign: "center",
    width: "1em",
  },
  questionBox: {
    alignContent: "space-between",
    alignItems: "center",
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
    marginBottom: "10px",
    padding: "10px",
  }
}))

export const PlayScreen = () => {
  const { dispatch, state } = React.useContext(GameContext)

  const classes = useStyles({})

  const [submitDisabled, setSubmitDisabled] = React.useState(true)
  const [answer, setAnswer] = React.useState("")

  const inputEl = React.useRef(null)
  const submitEl = React.useRef(null)

  const question = state.questions[state.round]

  const handleSubmit = () => {
    inputEl.current.focus()
    setSubmitDisabled(true)
    dispatch({ type: actions.SUBMIT_ANSWER, payload: answer })
    setAnswer("")
  }

  const handleChange = event => {
    const { value } = event.target

    if (value !== "" && !Number.isInteger(Number.parseInt(value, 10))) {
      return
    }
    setSubmitDisabled(false)
    setAnswer(event.target.value)
  }
  const handleKeyUp = event => {
    if (event.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div data-testid="play-screen">
      <Box className={classes.questionBox}>
        <span className={classes.argument} data-testid="question-a">{question.a}</span>
        <span className={classes.operator}>x</span>
        <span className={classes.argument} data-testid="question-b">{question.b}</span>
        <span className={classes.operator}>=</span>
        <input
          className={classes.answer}
          autoFocus={true}
          placeholder="?"
          type="number"
          value={answer}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          ref={inputEl}
          data-testid="answer"
        />
      </Box>
      <Button
        data-testid="answer-submit"
        onClick={handleSubmit}
        ref={submitEl}
        disabled={submitDisabled}
        variant="contained"
        color="primary"
        size="large"
        fullWidth={true}
      >
        Answer
      </Button>
    </div>
  )
}
