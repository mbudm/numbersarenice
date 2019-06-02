import * as React from "react"

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles(() => ({
  input: {
    width: 120
  },
  root: {
    whiteSpace: "nowrap"
  },
}));

export const EditName = ({ onEdit }) => {
  const classes = useStyles({})
  const [name, setName] = React.useState("");
  const onChange = e => setName(e.target.value);
  const onSubmit = e => onEdit(name);
  return (<span className={classes.root}>
    <input
      data-testid="edit-name-input"
      type="text" value={name}
      onChange={onChange}
      placeholder="Add your name"
      className={classes.input}
    />
    <IconButton
      onClick={onSubmit}
      data-testid="edit-name-save-button"
      aria-label="Save your score"
      >
      <AddBoxIcon />
    </IconButton>
  </span>);
};
