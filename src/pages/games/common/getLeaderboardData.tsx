import { hasLocalStorage } from "./hasStorage";


export interface ILeaderboardEntry {
  difficulty: string
  endTime: number
  name: string
  score: number
  startTime: number
}

export const getLeaderboardData = (GAME_KEY): ILeaderboardEntry[] => {
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

export const sortByScore = (rows) => {
  const copy = [...rows]
  return copy.sort((a, b) => b.score - a.score)
}

export const appendLeaderboard = (gameData: ILeaderboardEntry, GAME_KEY) => {
  const rows = getLeaderboardData(GAME_KEY)
  return updateLeaderboard([...rows, gameData], GAME_KEY)
}

export const updateLeaderboard = (rows: ILeaderboardEntry[], GAME_KEY):ILeaderboardEntry[] => {
  const sortedRows = sortByScore(rows)
  if (!hasLocalStorage()) {
    return rows;
  }
  try {
    localStorage.setItem(GAME_KEY, JSON.stringify(sortedRows));
  }
  catch (e) {
    // No localstorage, or empty leaderboard
  }
  return sortedRows;
}

export const resetLeaderboard = (GAME_KEY) => {
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
