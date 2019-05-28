import * as React from "react"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

import { gameTime } from "../times-table-speed/gameTime"
import {
  appendLeaderboard,
  getLeaderboardData,
  ILeaderboardEntry,
  sortByScore,
  updateLeaderboard,
} from "./getLeaderboardData"


export const LEADERBOARD_DISPLAY_LENGTH = 5

interface ILeaderboardProps {
  newGame?: ILeaderboardEntry
  storageKey: string
}

export const getGameIndex = (
  gameData: ILeaderboardEntry,
  leaderboardData: ILeaderboardEntry[]
) => {
  const index = leaderboardData.findIndex((l) => l === gameData)
  return index < 0 ? leaderboardData.length : index
}

export const getLeaderboardAtGamePosition = (gameData, leaderboardData) => {
  const leaderboardDataWithGameData = sortByScore([...leaderboardData, gameData])
  const gameIndex = getGameIndex(gameData, leaderboardDataWithGameData)

  let gameLeaderboardAtGamePosition

  if(leaderboardDataWithGameData.length <= LEADERBOARD_DISPLAY_LENGTH){
    gameLeaderboardAtGamePosition = leaderboardDataWithGameData
  }else{
    const idealRows = (LEADERBOARD_DISPLAY_LENGTH - 1) / 2 // ideally we have equal before and after rows to show context
    const afterGap = leaderboardData.length - gameIndex // slots after the game index
    const beforeGap = gameIndex // slots before the gameIndex
    const rowsBefore = afterGap < idealRows ? idealRows + (idealRows - afterGap) : Math.min(idealRows, beforeGap) // if there isn't enough rows after then show more before
    const rowsAfter = beforeGap < idealRows ? idealRows + (idealRows - beforeGap) : Math.min(idealRows, afterGap) // if there isnt enough before then show more after
    gameLeaderboardAtGamePosition = leaderboardDataWithGameData.slice(gameIndex - rowsBefore, gameIndex + rowsAfter + 1); // slice from the  rowsBefore the game data index to after the gameIndex plus rows after
  }
  return gameLeaderboardAtGamePosition
}


const useLeaderboardData = (storageKey, newGame: ILeaderboardEntry) => {
  const createRows = (): ILeaderboardEntry[] => {
    const existing = getLeaderboardData(storageKey)
    return newGame ?
      getLeaderboardAtGamePosition(newGame, existing) :
      existing.slice(0, Math.min(existing.length, LEADERBOARD_DISPLAY_LENGTH))
  }

  const [rows, setRows] = React.useState<ILeaderboardEntry[]>(createRows)

  React.useEffect(() => {
    setRows(createRows())
  }, [newGame])

  return { rows, setRows }
}

const useEditRow = (rows: ILeaderboardEntry[], newGame?: ILeaderboardEntry) => {
  const initialState = (): number => {
    return newGame ? rows.findIndex(l => l.endTime === newGame.endTime) : -1
  }
  const [editRow, setEditRow] = React.useState<number>(initialState)

  return { editRow, setEditRow }
}

export const Leaderboard = ({ storageKey, newGame }: ILeaderboardProps) => {
  const { rows, setRows } = useLeaderboardData(storageKey, newGame)
  const { editRow, setEditRow } = useEditRow(rows, newGame)
  const onResetLeaderboard = () => {
    const emptyRows: ILeaderboardEntry[] = []
    setEditRow(-1)
    updateLeaderboard(emptyRows, storageKey)
    setRows(emptyRows)
  }
  return (
    <>
      {rows.length > 0 && <LeaderboardTable rows={rows} editRow={editRow} storageKey={storageKey}/>}
      {rows.length > 0 && (
        <p>
          <a
            onClick={onResetLeaderboard}
            data-testid="reset-leaderboard-anchor"
          >
            Reset leaderboard
          </a>
        </p>
      )}
    </>
  )
}

const validEditRow = (row: number, rows: ILeaderboardEntry[]) =>
  row >= 0 && row < rows.length


const useEditName = (rows: ILeaderboardEntry[], editRow, storageKey) => {
  const didMountRef = React.useRef(false);
  const [editName, setEditName] = React.useState("")
  React.useEffect(() => {
    if (didMountRef.current) {
      appendLeaderboard({
        ...rows[editRow],
        name: editName
      }, storageKey)
    } else {
      didMountRef.current = true;
    }
  }, [editName])
  return { editName, setEditName }
}

const LeaderboardTable = ({ rows, editRow, storageKey }) => {
  const [editToggle, setEditToggle] = React.useState(
    validEditRow(editRow, rows)
  )
  const {editName, setEditName} = useEditName(rows, editRow, storageKey)
  const onEditRow = name => {
    setEditToggle(false)
    setEditName(name)
  }
  return (
    <Table data-testid="leaderboard">
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
        {rows.map((row, idx) => (
          <TableRow key={idx} data-testid={idx === editRow ? "edit-row" : null}>
            <TableCell align="right">{idx + 1}</TableCell>
            <TableCell component="th" scope="row">
              {editToggle && idx === editRow ? (
                <EditName onEdit={onEditRow} />
              ) : (
                <span data-testid="player-name">{idx === editRow ? editName : row.name}</span>
              )}
            </TableCell>
            <TableCell align="right" data-testid="score">{row.score}</TableCell>
            <TableCell align="right">
              <span data-testid="time">{gameTime(row.startTime, row.endTime)}</span> secs
            </TableCell>
            <TableCell align="right">{row.difficulty}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const EditName = ({ onEdit }) => {
  const [name, setName] = React.useState("")
  const onChange = e => setName(e.target.value)
  const onSubmit = e => onEdit(name)
  return (
    <span>
      <input
        data-testid="edit-name-input"
        type="text"
        value={name}
        onChange={onChange}
        placeholder="Your name"
      />
      <button data-testid="edit-name-save-button" onClick={onSubmit}>
        Save
      </button>
    </span>
  )
}
