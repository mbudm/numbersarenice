import * as React from "react"

import {
  getLeaderboardData,
  ILeaderboardEntry,
  sortByScore,
  updateLeaderboard,
} from "./getLeaderboardData"
import { LeaderboardTable } from "./LeaderboardTable";

export const LEADERBOARD_DISPLAY_LENGTH = 5

interface ILeaderboardProps {
  newGame?: ILeaderboardEntry
  storageKey: string
}

const updateGame = (rows: ILeaderboardEntry[], newGame: ILeaderboardEntry) => {
  const newRows = [...rows]
  const gameIndex = findGameRow(rows, newGame)
  newRows[gameIndex] = newGame
  return newRows
}

const useLeaderboardData = (storageKey, newGame: ILeaderboardEntry, saveRows:boolean, setSaveRows) => {
  const createRows = (): ILeaderboardEntry[] => {
    const existing = getLeaderboardData(storageKey)
    return newGame ?
      sortByScore([...existing, newGame]) :
      existing
  }

  const [rows, setRows] = React.useState<ILeaderboardEntry[]>(createRows)

  React.useEffect(() => {
    setRows(updateGame(rows, newGame))
  }, [newGame])

  React.useEffect(() => {
    if(saveRows){
      updateLeaderboard(rows, storageKey)
      setSaveRows(false)
    }
  }, [rows])

  return { rows, setRows }
}

const findGameRow = (rows: ILeaderboardEntry[], newGame: ILeaderboardEntry) => {
  return newGame ? rows.findIndex(l => l.startTime === newGame.startTime) : null
}

const getInitialPage = (rowsLength:number, editRow: number) => {
  const optimalPadding = (LEADERBOARD_DISPLAY_LENGTH -1) / 2
  let initialPage = 0; // default to use the start
  if(rowsLength <= LEADERBOARD_DISPLAY_LENGTH || editRow <= optimalPadding ){
    initialPage = 0
  } else if(editRow + optimalPadding >= rowsLength){
    initialPage = Math.max(0, rowsLength - LEADERBOARD_DISPLAY_LENGTH)
  } else {
    initialPage = editRow - optimalPadding
  }
  return initialPage
}

const usePage = (rows: ILeaderboardEntry[], editRow?: number) => {
  const initialState = (): number => {
    return editRow ?
      getInitialPage(rows.length, editRow) :
      0
  }
  const [page, setPage] = React.useState<number>(initialState)
  return { page, setPage }
}

export const Leaderboard = ({ storageKey, newGame }: ILeaderboardProps) => {

  const [ saveRows, setSaveRows] = React.useState(false)
  const { rows, setRows } = useLeaderboardData(storageKey, newGame, saveRows, setSaveRows)
  const gameRow = findGameRow(rows, newGame)
  const { page, setPage } = usePage(rows, gameRow)

  const onResetLeaderboard = () => {
    const emptyRows: ILeaderboardEntry[] = []
    setSaveRows(true)
    setRows(emptyRows)
  }

  const onRowEdit = (name) => {
    const editedGame = {...rows[gameRow]}
    editedGame.name = name
    setSaveRows(true)
    setRows(updateGame(rows, editedGame))
  }

  return (
    <>
      {rows.length > 0 && <LeaderboardTable onRowEdit={onRowEdit} rows={rows} gameRow={gameRow} page={page}/>}
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
      <p>More | less links</p>
    </>
  )
}


