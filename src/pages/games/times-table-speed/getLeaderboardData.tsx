import { hasLocalStorage } from "../common/hasStorage";
import { GAME_KEY } from "./Game";


export interface ILeaderboardEntry {
  difficulty: string
  endTime: number
  name: string
  score: number
  startTime: number
}

export const getLeaderboardData = (): ILeaderboardEntry[] => {
  let rows:ILeaderboardEntry[] = [];
  if (!hasLocalStorage()) {
    return rows;
  }
  try {
    const data = localStorage.getItem(GAME_KEY);
    rows = data && data.length > 0 ? JSON.parse(data) : rows;
  }
  catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e)
    // No localstorage, or empty leaderboard
  }
  return rows;
};


export const updateLeaderboard = (gameData: ILeaderboardEntry) => {
  const rows = getLeaderboardData()
  const updatedRows = [...rows, gameData]
  updatedRows.sort((a, b) => b.score - a.score)
  if (!hasLocalStorage()) {
    return rows;
  }
  try {
    localStorage.setItem(GAME_KEY, JSON.stringify(updatedRows));
  }
  catch (e) {
    // No localstorage, or empty leaderboard
  }
  return updatedRows;
}

export const resetLeaderboard = () => {
  if (!hasLocalStorage()) {
    return
  }
  try {
    localStorage.setItem(GAME_KEY, "");
  }
  catch (e) {
    // No localstorage, or empty leaderboard
  }
  return
}
