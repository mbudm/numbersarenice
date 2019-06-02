import * as React from "react"
import Responsive from "react-responsive"

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { gameTime } from "../gameTime";
import { EditName } from "./EditName";
import { ILeaderboardEntry } from "./getLeaderboardData";
import { LEADERBOARD_DISPLAY_LENGTH } from "./Leaderboard";

const Mobile = props => <Responsive {...props} maxWidth={767} />
const Default = props => <Responsive {...props} minWidth={768} />

const validEditRow = (row: number, rows: ILeaderboardEntry[]) => Number.isInteger(row) && row < rows.length;

export const LeaderboardTable = (props) => (
  <>
    <p>should see a table {props.values.width}</p>
    <Default values={props.values}>
      <p>should see table default</p>
      <TableSpacious {...props} />
    </Default>
    <Mobile values={props.values}>
      <p>should see table mobile</p>
      <TableCondensed {...props} />
    </Mobile>
  </>
)


export const TableSpacious = ({ onRowEdit, rows, gameRow, page }) => {
  const [editToggle, setEditToggle] = React.useState(validEditRow(gameRow, rows));
  const onEditRow = name => {
    setEditToggle(false);
    onRowEdit(name);
  };
  const pageMax = Math.min(page + LEADERBOARD_DISPLAY_LENGTH, rows.length)
  return (
    <Table data-testid="leaderboard">
    <TableHead>
      <TableRow>
        <TableCell align="right">Rank</TableCell>
        <TableCell align="left">Name</TableCell>
        <TableCell align="right">Score</TableCell>
        <TableCell align="right" >Time</TableCell>
        <TableCell align="right" >Difficulty</TableCell>
      </TableRow>
    </TableHead>
    <TableBody data-testid="leaderboard-tbody">
      {rows.slice(page, pageMax).map((row, idx) => (<TableRow key={idx} data-testid={page + idx === gameRow ? "edit-row" : null}>
        <TableCell data-testid="position" align="right">{page + idx + 1}</TableCell>
        <TableCell component="th" scope="row">
          {editToggle && (page + idx === gameRow) ? (<EditName onEdit={onEditRow} />) : (<span data-testid="player-name">{row.name}</span>)}
        </TableCell>
        <TableCell align="right" data-testid="score">{row.score}</TableCell>
        <TableCell align="right" >
          <span data-testid="time">{gameTime(row.startTime, row.endTime)}</span> secs
            </TableCell>
        <TableCell align="right" >{row.difficulty}</TableCell>
      </TableRow>))}
    </TableBody>
  </Table>);
};



export const TableCondensed = ({ onRowEdit, rows, gameRow, page, classes }) => {
  const [editToggle, setEditToggle] = React.useState(validEditRow(gameRow, rows));
  const onEditRow = name => {
    setEditToggle(false);
    onRowEdit(name);
  };
  const pageMax = Math.min(page + LEADERBOARD_DISPLAY_LENGTH, rows.length)
  return (
    <Table data-testid="leaderboard" size="small">
    <TableHead>
      <TableRow>
        <TableCell align="right">Rank</TableCell>
        <TableCell align="left">Name</TableCell>
        <TableCell align="right">Score</TableCell>
      </TableRow>
    </TableHead>
    <TableBody data-testid="leaderboard-tbody">
      {rows.slice(page, pageMax).map((row, idx) => (<TableRow key={idx} data-testid={page + idx === gameRow ? "edit-row" : null}>
        <TableCell data-testid="position" align="right">{page + idx + 1}</TableCell>
        <TableCell component="th" scope="row">
          {editToggle && (page + idx === gameRow) ? (<EditName onEdit={onEditRow} />) : (<span data-testid="player-name">{row.name}</span>)}
        </TableCell>
        <TableCell align="right" data-testid="score">{row.score}</TableCell>
      </TableRow>))}
    </TableBody>
  </Table>);
};
