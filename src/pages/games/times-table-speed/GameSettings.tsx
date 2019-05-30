import * as React from "react"

import { FormControl, InputLabel, OutlinedInput, Select } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { gameDifficulty, NUM_ROUNDS_MAX, NUM_ROUNDS_MIN } from "./constants";
import { GameContext } from "./Game";
import { actions } from "./reducer";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const GameSettings = () => {
  const { dispatch, state } = React.useContext(GameContext);

  const classes = useStyles();

  const difficultyLabel = React.useRef(null);
  const [difficultyLabelWidth, setDifficultyLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setDifficultyLabelWidth(difficultyLabel.current.offsetWidth);
  }, []);
  const changeDifficulty = (e) => dispatch({ type: actions.CHANGE_DIFFICULTY, payload: e.target.value });

  const roundsLabel = React.useRef(null);
  const [roundsLabelWidth, setRoundsLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setRoundsLabelWidth(roundsLabel.current.offsetWidth);
  }, []);
  const changeRounds = (e) => dispatch({ type: actions.CHANGE_ROUNDS, payload: e.target.value });
  return (<form className={classes.root}>
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={difficultyLabel} htmlFor="outlined-difficulty-native-simple">
        Difficulty
        </InputLabel>
      <Select native value={state.difficulty} onChange={changeDifficulty} input={<OutlinedInput name="difficulty" labelWidth={difficultyLabelWidth} id="outlined-difficulty-native-simple" />}>
        {gameDifficulty.map((gd, i) => (<option key={i} value={i} selected={i === state.difficulty}>
          {gd.label}
        </option>))}
      </Select>
    </FormControl>

    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={roundsLabel} htmlFor="outlined-rounds-native-simple">
        Rounds
        </InputLabel>
      <Select native value={state.rounds} onChange={changeRounds} input={<OutlinedInput name="rounds" labelWidth={roundsLabelWidth} id="outlined-rounds-native-simple" />}>
        {getRoundsOptionList(state.rounds)}
      </Select>
    </FormControl>
  </form>);
};

const getRoundsOptionList = numRounds => {
  const list = [];
  for (let i = NUM_ROUNDS_MIN; i <= NUM_ROUNDS_MAX; i++) {
    list.push(<option key={i} value={i} selected={i === numRounds}>
      {i}
    </option>);
  }
  return list;
};
