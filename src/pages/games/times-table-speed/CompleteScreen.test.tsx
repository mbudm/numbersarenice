import { getLeaderboardAtGamePosition } from "./CompleteScreen"
import { gameDifficulty } from "./Game"
import { ILeaderboardEntry, sortByScore } from "./getLeaderboardData"

describe("getLeaderboardAtGamePosition", () => {
  const now = Date.now()
  const gameData: ILeaderboardEntry = {
    difficulty: gameDifficulty.EASY,
    endTime: now + 10000,
    name: "",
    score: 50,
    startTime: now,
  }

  const bulkLeaderboardData = [
    {
      difficulty: gameDifficulty.EASY,
      endTime: now - 10000,
      name: "fred",
      score: 30,
      startTime: now - 30000,
    },
    {
      difficulty: gameDifficulty.EASY,
      endTime: now - 100000,
      name: "barney",
      score: 40,
      startTime: now - 110000,
    },
    {
      difficulty: gameDifficulty.HARD,
      endTime: now - 10000,
      name: "wilma",
      score: 70,
      startTime: now - 30000,
    },
    {
      difficulty: gameDifficulty.MEDIUM,
      endTime: now - 50000,
      name: "patty",
      score: 60,
      startTime: now - 55000,
    },
  ]

  it("No leaderboard data exists", () => {
    const leaderboardData = []

    const result = getLeaderboardAtGamePosition(gameData, leaderboardData)

    expect(result.length).toBe(1)
  })

  it("Leaderboard two items, game score is worst", () => {
    const leaderboardData = [bulkLeaderboardData[2], bulkLeaderboardData[3]]

    const result = getLeaderboardAtGamePosition(gameData, leaderboardData)

    expect(result.length).toBe(3)
    expect(result[2]).toEqual(gameData)
  })

  it("Leaderboard two items, game score is best", () => {
    const leaderboardData = [bulkLeaderboardData[1], bulkLeaderboardData[0]]

    const result = getLeaderboardAtGamePosition(gameData, leaderboardData)

    expect(result.length).toBe(3)
    expect(result[0]).toEqual(gameData)
  })

  it("Leaderboard two items, game score is middle", () => {
    const middleGameData = {
      ...gameData,
      score: 35,
    }
    const leaderboardData = [bulkLeaderboardData[1], bulkLeaderboardData[0]]

    const result = getLeaderboardAtGamePosition(middleGameData, leaderboardData)

    expect(result.length).toBe(3)
    expect(result[1]).toEqual(middleGameData)
  })

  it("Leaderboard four items, game score is worst", () => {
    const worstGameData = {
      ...gameData,
      score: 10,
    }
    const leaderboardData = sortByScore(bulkLeaderboardData)

    const result = getLeaderboardAtGamePosition(worstGameData, leaderboardData)

    expect(result.length).toBe(5)
    expect(result[4]).toEqual(worstGameData)
  })

  it("Leaderboard four items, game score is best", () => {
    const bestGameData = {
      ...gameData,
      score: 100,
    }
    const leaderboardData = sortByScore(bulkLeaderboardData)
    const result = getLeaderboardAtGamePosition(bestGameData, leaderboardData)

    expect(result.length).toBe(5)
    expect(result[0]).toEqual(bestGameData)
  })

  it("Leaderboard four items, game score is second best", () => {
    const secondBestGameData = {
      ...gameData,
      score: 65,
    }
    const leaderboardData = sortByScore(bulkLeaderboardData)

    const result = getLeaderboardAtGamePosition(
      secondBestGameData,
      leaderboardData
    )

    expect(result.length).toBe(5)
    expect(result[1]).toEqual(secondBestGameData)
  })

  it("Leaderboard six items, game score is worst", () => {
    const worstGameData = {
      ...gameData,
      score: 2,
    }
    const leaderboardData = sortByScore([...bulkLeaderboardData, worstGameData])
    const result = getLeaderboardAtGamePosition(
      worstGameData,
      leaderboardData
    )

    expect(result.length).toBe(5)
    expect(result[4]).toEqual(worstGameData)
  })

  it("Leaderboard seven items, game score is second best", () => {
    const secondBestGameData = {
      ...gameData,
      score: 68,
    }
    const secondWorstGameData = {
      ...gameData,
      score: 32,
    }
    const leaderboardData = sortByScore([...bulkLeaderboardData, secondBestGameData, secondWorstGameData])
    const result = getLeaderboardAtGamePosition(
      secondBestGameData,
      leaderboardData
    )

    expect(result.length).toBe(5)
    expect(result[1]).toEqual(secondBestGameData)
  })
})
