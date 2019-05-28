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

interface ILeaderboardEntryWithPosition extends ILeaderboardEntry {
  position: number
}

export const getGameIndex = (
  gameData: ILeaderboardEntry,
  leaderboardData: ILeaderboardEntry[]
) => {
  const index = leaderboardData.findIndex((l) => l === gameData)
  return index < 0 ? leaderboardData.length : index
}

export const getLeaderboardAtGamePosition = (gameData, leaderboardData):ILeaderboardEntryWithPosition[] => {
  const leaderboardDataWithGameData = sortByScore([...leaderboardData, gameData])
  const gameIndex = getGameIndex(gameData, leaderboardDataWithGameData)

  let gameLeaderboardAtGamePosition

  if(leaderboardDataWithGameData.length <= LEADERBOARD_DISPLAY_LENGTH){
    gameLeaderboardAtGamePosition = addPosition(leaderboardDataWithGameData)
  }else{
    const idealRows = (LEADERBOARD_DISPLAY_LENGTH - 1) / 2 // ideally we have equal before and after rows to show context
    const afterGap = leaderboardData.length - gameIndex // slots after the game index
    const beforeGap = gameIndex // slots before the gameIndex
    const rowsBefore = afterGap < idealRows ? idealRows + (idealRows - afterGap) : Math.min(idealRows, beforeGap) // if there isn't enough rows after then show more before
    const rowsAfter = beforeGap < idealRows ? idealRows + (idealRows - beforeGap) : Math.min(idealRows, afterGap) // if there isnt enough before then show more after
    const sliced = leaderboardDataWithGameData.slice(gameIndex - rowsBefore, gameIndex + rowsAfter + 1); // slice from the  rowsBefore the game data index to after the gameIndex plus rows after
    gameLeaderboardAtGamePosition = addPosition(sliced, rowsBefore, gameIndex)
  }
  return gameLeaderboardAtGamePosition
}

const addPosition = (rows:ILeaderboardEntry[], gameIndex?:number, gamePosition?:number):ILeaderboardEntryWithPosition[] => {
  return rows.map((r, i) => {
    const position = gamePosition ?
      gamePosition - gameIndex + i + 1 : // +1 for 1 based counting
      i + 1
    return {
        ...r,
        position
      }
  })
}


const useLeaderboardData = (storageKey, newGame: ILeaderboardEntry) => {
  const createRows = (): ILeaderboardEntry[] => {
    const existing = getLeaderboardData(storageKey)
    return newGame ?
      getLeaderboardAtGamePosition(newGame, existing) :
      addPosition(existing.slice(0, Math.min(existing.length, LEADERBOARD_DISPLAY_LENGTH)))
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


