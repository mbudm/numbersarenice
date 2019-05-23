import * as React from "react";

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

import { gameTime } from "../times-table-speed/gameTime";
import { ILeaderboardEntry } from "../times-table-speed/getLeaderboardData";

interface ILeaderboardProps {
  rows: ILeaderboardEntry[]
  editRow?: number
  onEdit?:(name:string) => void
}

const validEditRow = (row:number, rows:ILeaderboardEntry[]) => row >= 0 && row < rows.length

export const LeaderBoard = ({ rows, editRow, onEdit }: ILeaderboardProps ) => {
  const [editToggle, setEditToggle] = React.useState(validEditRow(editRow, rows))
  const onEditRow = (name) => {
    setEditToggle(false)
    onEdit(name)
  }
  return (
    <Table data-testid="leaderboard">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Score</TableCell>
          <TableCell align="right">Time</TableCell>
          <TableCell align="right">Difficulty</TableCell>
        </TableRow>
      </TableHead>
      <TableBody data-testid="leaderboard-tbody">
        {rows.map((row, idx) => (
          <TableRow key={idx} data-testid={idx === editRow && "edit-row"}>
            <TableCell align="right">{idx + 1}</TableCell>
            <TableCell component="th" scope="row">
              {editToggle && idx === editRow ?
              <EditName onEdit={onEditRow} /> :
              <span data-testid="player-name" >{row.name}</span>
            }
            </TableCell>
            <TableCell align="right">{row.score}</TableCell>
            <TableCell align="right">{gameTime(row.startTime, row.endTime)}</TableCell>
            <TableCell align="right">{row.difficulty}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const EditName = ({onEdit}) => {
  const [name, setName] = React.useState("")
  const onChange = (e) => setName(e.target.value)
  const onSubmit = (e) => onEdit(name)
  return (
    <span>
      <input data-testid="edit-name-input" type="text" value={name} onChange={onChange} placeholder="Your name"/>
      <button data-testid="edit-name-save-button"onClick={onSubmit}>Save</button>
    </span>
  )
}
