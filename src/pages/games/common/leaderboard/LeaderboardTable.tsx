import * as React from "react"

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { gameTime } from "../gameTime";
import { EditName } from "./EditName";
import { appendLeaderboard, ILeaderboardEntry } from "./getLeaderboardData";

const validEditRow = (row: number, rows: ILeaderboardEntry[]) => row >= 0 && row < rows.length;
const useEditName = (rows: ILeaderboardEntry[], editRow, storageKey) => {
  const didMountRef = React.useRef(false);
  const [editName, setEditName] = React.useState("");
  React.useEffect(() => {
    if (didMountRef.current) {
      appendLeaderboard({
        ...rows[editRow],
        name: editName
      }, storageKey);
    }
    else {
      didMountRef.current = true;
    }
  }, [editName]);
  return { editName, setEditName };
};
export const LeaderboardTable = ({ rows, editRow, storageKey }) => {
  const [editToggle, setEditToggle] = React.useState(validEditRow(editRow, rows));
  const { editName, setEditName } = useEditName(rows, editRow, storageKey);
  const onEditRow = name => {
    setEditToggle(false);
    setEditName(name);
  };
  return (<Table data-testid="leaderboard">
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell align="right">Name</TableCell>
        <TableCell align="right">Score</TableCell>
        <TableCell align="right">Time</TableCell>
        <TableCell align="right">Difficulty</TableCell>
      </TableRow>
    </TableHead>
    <TableBody data-testid="leaderboard-tbody">
      {rows.map((row, idx) => (<TableRow key={idx} data-testid={idx === editRow ? "edit-row" : null}>
        <TableCell data-testid="position" align="right">{row.position}</TableCell>
        <TableCell component="th" scope="row">
          {editToggle && idx === editRow ? (<EditName onEdit={onEditRow} />) : (<span data-testid="player-name">{idx === editRow ? editName : row.name}</span>)}
        </TableCell>
        <TableCell align="right" data-testid="score">{row.score}</TableCell>
        <TableCell align="right">
          <span data-testid="time">{gameTime(row.startTime, row.endTime)}</span> secs
            </TableCell>
        <TableCell align="right">{row.difficulty}</TableCell>
      </TableRow>))}
    </TableBody>
  </Table>);
};
