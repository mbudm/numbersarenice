import React from "react"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

export const LeaderBoard = ({ rows }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell align="right">Name</TableCell>
        <TableCell align="right">Score</TableCell>
        <TableCell align="right">Time</TableCell>
        <TableCell align="right">Difficulty</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map(row => (
        <TableRow key={row.id}>
          <TableCell align="right">{row.id}</TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.score}</TableCell>
          <TableCell align="right">{row.time}</TableCell>
          <TableCell align="right">{row.difficulty}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)
