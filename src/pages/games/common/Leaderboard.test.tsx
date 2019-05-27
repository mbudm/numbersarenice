
import "jest-dom/extend-expect"
import * as React from "react"
import {
  fireEvent,
  getByTestId,
  queryByTestId,
  render,
} from "react-testing-library"

import { ILeaderboardEntry } from "./getLeaderboardData"
import { Leaderboard } from "./Leaderboard"

const STORAGE_KEY = "my-xyz-game"
const secondsToMs = secs => secs * 1000

describe("Leaderboard", () => {
  it("No leaderboard is displayed, as no local data exists", () => {
    const { container } = render(<Leaderboard storageKey={STORAGE_KEY} />)
    expect(queryByTestId(container, "leaderboard")).not.toBeInstanceOf(
      HTMLElement
    )
  })

  it("No leaderboard reset link is displayed, as no leaderboard exists", () => {
    const { container } = render(<Leaderboard storageKey={STORAGE_KEY} />)
    expect(
      queryByTestId(container, "reset-leaderboard-anchor")
    ).not.toBeInstanceOf(HTMLElement)
  })

  it("passing a new game enables editable entry", () => {
    // arrange
    const now = Date.now()
    const newGame: ILeaderboardEntry = {
      difficulty: "Crazy Hard",
      endTime: now,
      name: "",
      score: 83,
      startTime: now - secondsToMs(20),
    }

    // act
    const { container } = render(
      <Leaderboard storageKey={STORAGE_KEY} newGame={newGame} />
    )

    // assert
    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(1)
    expect(queryByTestId(leaderboardTbody, "edit-row")).toBeInstanceOf(
      HTMLElement
    )
    expect(queryByTestId(leaderboardTbody, "edit-name-input")).toBeInstanceOf(
      HTMLElement
    )
    expect(queryByTestId(leaderboardTbody, "player-name")).not.toBeInstanceOf(
      HTMLElement
    )
    expect(
      queryByTestId(leaderboardTbody, "edit-name-save-button")
    ).toBeInstanceOf(HTMLElement)
  })

  it("saving an editable entry, updates localstorage and leaderboard UI", () => {
    // arrange
    const now = Date.now()
    const newGame: ILeaderboardEntry = {
      difficulty: "Crazy Hard",
      endTime: now,
      name: "",
      score: 83,
      startTime: now - secondsToMs(20),
    }

    // act
    const { container } = render(
      <Leaderboard storageKey={STORAGE_KEY} newGame={newGame} />
    )
    const editRow = getByTestId(container, "edit-row")
    const editName = getByTestId(editRow, "edit-name-input")
    const editSaveButton = getByTestId(editRow, "edit-name-save-button")
    fireEvent.change(editName, { target: { value: "Player 1" } })
    fireEvent.click(editSaveButton)

    // assert
    expect(queryByTestId(editRow, "edit-name-input")).not.toBeInstanceOf(
      HTMLElement
    )
    expect(queryByTestId(editRow, "player-name")).toBeInstanceOf(HTMLElement)
    const playerName = getByTestId(container, "player-name")
    expect(playerName).toHaveTextContent("Player 1")
  })

  it("on load has 1 entry from localstorage and is reset-able", () => {
    const { container } = render(<Leaderboard storageKey={STORAGE_KEY} />)
    expect(queryByTestId(container, "leaderboard")).toBeInstanceOf(HTMLElement)
    expect(queryByTestId(container, "reset-leaderboard-anchor")).toBeInstanceOf(
      HTMLElement
    )
  })

  it("on passing of new game shows 2 entries in descending order by score", () => {
    // arrange
    const now = Date.now()
    const newGame: ILeaderboardEntry = {
      difficulty: "Crazy Hard",
      endTime: now,
      name: "",
      score: 84,
      startTime: now - secondsToMs(20),
    }

    // act
    const { container } = render(
      <Leaderboard storageKey={STORAGE_KEY} newGame={newGame} />
    )

    // assert
    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(2)
    const firstChildScore = getByTestId(leaderboardTbody.childNodes[0] as HTMLElement, "score")
    const secondChildScore = getByTestId(leaderboardTbody.childNodes[1] as HTMLElement, "score")
    expect(firstChildScore).toHaveTextContent("84")
    expect(secondChildScore).toHaveTextContent("83")
  })

  it("adds a 3rd entries in appropriate score position", () => {})

  it("when adding many more entries the leaderboard only shows max entries", () => {})

  it("when adding a new entry, shows adjacent entries up to  max score - middle", () => {})

  it("when adding a new entry, shows adjacent entries up to  max score - top", () => {})

  it("when adding a new entry, shows adjacent entries up to  max score - bottom", () => {})
})

/*

it("leaderboard has one row", () => {
  const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
  expect(leaderboardTbody.childNodes.length).toBe(1)
})

it("leaderboard row is edit-row, which has edit field (is editable)", () => {
  const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
  expect(queryByTestId(leaderboardTbody, "edit-row")).toBeInstanceOf(
    HTMLElement
  )
  expect(queryByTestId(leaderboardTbody, "edit-name-input")).toBeInstanceOf(
    HTMLElement
  )
  expect(queryByTestId(leaderboardTbody, "player-name")).not.toBeInstanceOf(
    HTMLElement
  )
  expect(
    queryByTestId(leaderboardTbody, "edit-name-save-button")
  ).toBeInstanceOf(HTMLElement)
})

it("enter name and submit, changes to text cell", () => {
  const editRow = getByTestId(container, "edit-row")
  const editName = getByTestId(editRow, "edit-name-input")
  const editSaveButton = getByTestId(editRow, "edit-name-save-button")

  fireEvent.change(editName, { target: { value: "Neumann 1" } })
  fireEvent.click(editSaveButton)

  expect(queryByTestId(editRow, "edit-name-input")).not.toBeInstanceOf(
    HTMLElement
  )
  expect(queryByTestId(editRow, "player-name")).toBeInstanceOf(
    HTMLElement
  )
})
describe("Multiple games - loaderboard saved to localstorage", () => {

  let container
  beforeEach(() => {
    ({ container } = render(<Game />))
  })

  it("start screen has leaderboard with 1 entry", () => {
    expect(queryByTestId(container, "leaderboard")).toBeInstanceOf(
      HTMLElement
    )
    expect(
      queryByTestId(container, "reset-leaderboard-anchor")
    ).toBeInstanceOf(HTMLElement)
    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(1)
    const playerName = getByTestId(container, "player-name")
    expect(playerName).toHaveTextContent("Neumann 1")
  })

  it("complete screen has current game and plus existing leaderboard", () => {
    startGame(container)
    const answerInput = getByTestId(container, "answer")
    const answerSubmit = getByTestId(container, "answer-submit")
    answerAll(answerInput, answerSubmit)

    expect(queryByTestId(container, "complete-screen")).toBeInstanceOf(
      HTMLElement
    )

    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(2)
  })

  it("after saving another score, complete screen has leaderboard with 2 diff entries", () => {
    // arranging and acting a lot... hmm.
    startGame(container)
    const answerInput = getByTestId(container, "answer")
    const answerSubmit = getByTestId(container, "answer-submit")
    answerAll(answerInput, answerSubmit)
    const editName = getByTestId(container, "edit-name-input")
    const editSaveButton = getByTestId(container, "edit-name-save-button")
    fireEvent.change(editName, { target: { value: "Neumann 2" } })
    fireEvent.click(editSaveButton)

    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(2)
    const playerNames = queryAllByTestId(leaderboardTbody, "player-name")
    expect(playerNames).toBe(2)
    expect(playerNames[0]).toHaveTextContent("Neumann 1")
    expect(playerNames[0]).toHaveTextContent("Neumann 2")
  })

  it("start screen has 2 leaderboard entries", () => {
    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(2)
  })
})
*/
//   const now = Date.now()
//   const gameData: ILeaderboardEntry = {
//     difficulty: gameDifficulty.EASY,
//     endTime: now + 10000,
//     name: "",
//     score: 50,
//     startTime: now,
//   }

//   const bulkLeaderboardData = [
//     {
//       difficulty: gameDifficulty.EASY,
//       endTime: now - 10000,
//       name: "fred",
//       score: 30,
//       startTime: now - 30000,
//     },
//     {
//       difficulty: gameDifficulty.EASY,
//       endTime: now - 100000,
//       name: "barney",
//       score: 40,
//       startTime: now - 110000,
//     },
//     {
//       difficulty: gameDifficulty.HARD,
//       endTime: now - 10000,
//       name: "wilma",
//       score: 70,
//       startTime: now - 30000,
//     },
//     {
//       difficulty: gameDifficulty.MEDIUM,
//       endTime: now - 50000,
//       name: "patty",
//       score: 60,
//       startTime: now - 55000,
//     },
//   ]

//   it("No leaderboard data exists", () => {
//     const container  = render(<CompleteScreen />)
//     const leaderboardData = []

//     const result = getLeaderboardAtGamePosition(gameData, leaderboardData)

//     expect(result.length).toBe(1)
//   })

//   it("Leaderboard two items, game score is worst", () => {
//     const leaderboardData = [bulkLeaderboardData[2], bulkLeaderboardData[3]]

//     const result = getLeaderboardAtGamePosition(gameData, leaderboardData)

//     expect(result.length).toBe(3)
//     expect(result[2]).toEqual(gameData)
//   })

//   it("Leaderboard two items, game score is best", () => {
//     const leaderboardData = [bulkLeaderboardData[1], bulkLeaderboardData[0]]

//     const result = getLeaderboardAtGamePosition(gameData, leaderboardData)

//     expect(result.length).toBe(3)
//     expect(result[0]).toEqual(gameData)
//   })

//   it("Leaderboard two items, game score is middle", () => {
//     const middleGameData = {
//       ...gameData,
//       score: 35,
//     }
//     const leaderboardData = [bulkLeaderboardData[1], bulkLeaderboardData[0]]

//     const result = getLeaderboardAtGamePosition(middleGameData, leaderboardData)

//     expect(result.length).toBe(3)
//     expect(result[1]).toEqual(middleGameData)
//   })

//   it("Leaderboard four items, game score is worst", () => {
//     const worstGameData = {
//       ...gameData,
//       score: 10,
//     }
//     const leaderboardData = sortByScore(bulkLeaderboardData)

//     const result = getLeaderboardAtGamePosition(worstGameData, leaderboardData)

//     expect(result.length).toBe(5)
//     expect(result[4]).toEqual(worstGameData)
//   })

//   it("Leaderboard four items, game score is best", () => {
//     const bestGameData = {
//       ...gameData,
//       score: 100,
//     }
//     const leaderboardData = sortByScore(bulkLeaderboardData)
//     const result = getLeaderboardAtGamePosition(bestGameData, leaderboardData)

//     expect(result.length).toBe(5)
//     expect(result[0]).toEqual(bestGameData)
//   })

//   it("Leaderboard four items, game score is second best", () => {
//     const secondBestGameData = {
//       ...gameData,
//       score: 65,
//     }
//     const leaderboardData = sortByScore(bulkLeaderboardData)

//     const result = getLeaderboardAtGamePosition(
//       secondBestGameData,
//       leaderboardData
//     )

//     expect(result.length).toBe(5)
//     expect(result[1]).toEqual(secondBestGameData)
//   })

//   it("Leaderboard six items, game score is worst", () => {
//     const worstGameData = {
//       ...gameData,
//       score: 2,
//     }
//     const leaderboardData = sortByScore([...bulkLeaderboardData, worstGameData])
//     const result = getLeaderboardAtGamePosition(
//       worstGameData,
//       leaderboardData
//     )

//     expect(result.length).toBe(5)
//     expect(result[4]).toEqual(worstGameData)
//   })

//   it("Leaderboard seven items, game score is second best", () => {
//     const secondBestGameData = {
//       ...gameData,
//       score: 68,
//     }
//     const secondWorstGameData = {
//       ...gameData,
//       score: 32,
//     }
//     const leaderboardData = sortByScore([...bulkLeaderboardData, secondBestGameData, secondWorstGameData])
//     const result = getLeaderboardAtGamePosition(
//       secondBestGameData,
//       leaderboardData
//     )

//     expect(result.length).toBe(5)
//     expect(result[1]).toEqual(secondBestGameData)
//   })
// })
