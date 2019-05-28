
import "jest-dom/extend-expect"
import * as React from "react"
import {
  fireEvent,
  getByTestId,
  queryByTestId,
  render,
} from "react-testing-library"

import { getLeaderboardData, ILeaderboardEntry, updateLeaderboard } from "./getLeaderboardData"
import { Leaderboard, LEADERBOARD_DISPLAY_LENGTH } from "./Leaderboard"

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
    const editRow = getByTestId(container, "edit-row")
    const editName = getByTestId(editRow, "edit-name-input")
    const editSaveButton = getByTestId(editRow, "edit-name-save-button")
    fireEvent.change(editName, { target: { value: "Player 2" } })
    fireEvent.click(editSaveButton)

    // assert
    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(2)
    const firstChildScore = getByTestId(leaderboardTbody.childNodes[0] as HTMLElement, "score")
    const secondChildScore = getByTestId(leaderboardTbody.childNodes[1] as HTMLElement, "score")
    expect(firstChildScore).toHaveTextContent("84")
    expect(secondChildScore).toHaveTextContent("83")
  })

  it("adds a 3rd entries in appropriate score position", () => {
    // arrange
    const now = Date.now()
    const newGame: ILeaderboardEntry = {
      difficulty: "Crazy Hard",
      endTime: now,
      name: "",
      score: 83.5,
      startTime: now - secondsToMs(20),
    }

    // act
    const { container } = render(
      <Leaderboard storageKey={STORAGE_KEY} newGame={newGame} />
    )
    const editRow = getByTestId(container, "edit-row")
    const editName = getByTestId(editRow, "edit-name-input")
    const editSaveButton = getByTestId(editRow, "edit-name-save-button")
    fireEvent.change(editName, { target: { value: "Player 3" } })
    fireEvent.click(editSaveButton)

    // assert
    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(3)
    const firstChildScore = getByTestId(leaderboardTbody.childNodes[0] as HTMLElement, "score")
    const secondChildScore = getByTestId(leaderboardTbody.childNodes[1] as HTMLElement, "score")
    const thirdChildScore = getByTestId(leaderboardTbody.childNodes[2] as HTMLElement, "score")
    expect(firstChildScore).toHaveTextContent("84")
    expect(secondChildScore).toHaveTextContent("83.5")
    expect(thirdChildScore).toHaveTextContent("83")
  })

  it("when adding many more entries the leaderboard only shows max entries", () => {
    // arrange
    const newGames: ILeaderboardEntry[] = []
    for(let i = 0; i < 5; i++){
      const now = Date.now()
      newGames.push({
        difficulty: "Crazy Hard",
        endTime: now,
        name: "",
        score: 83 - i,
        startTime: now - secondsToMs(20),
      })
    }

    // act
    const leaderboardData = getLeaderboardData(STORAGE_KEY)
    updateLeaderboard([...leaderboardData, ...newGames], STORAGE_KEY)
    const { container } = render(
      <Leaderboard storageKey={STORAGE_KEY} />
    )

    // assert
    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(LEADERBOARD_DISPLAY_LENGTH)
  })

  it("when adding a new entry, shows adjacent entries up to max entries - middle", () => {
      // arrange
      const now = Date.now()
      const newGame: ILeaderboardEntry = {
        difficulty: "Crazy Hard",
        endTime: now,
        name: "",
        score: 83.0,
        startTime: now - secondsToMs(20),
      }

      // act
      const { container } = render(
        <Leaderboard storageKey={STORAGE_KEY} newGame={newGame} />
      )
      const editRow = getByTestId(container, "edit-row")
      const editName = getByTestId(editRow, "edit-name-input")
      const editSaveButton = getByTestId(editRow, "edit-name-save-button")
      fireEvent.change(editName, { target: { value: "Player Middle" } })
      fireEvent.click(editSaveButton)

      // assert
      const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
      expect(leaderboardTbody.childNodes.length).toBe(LEADERBOARD_DISPLAY_LENGTH)
      const thirdChildScore = getByTestId(leaderboardTbody.childNodes[2] as HTMLElement, "score")
      expect(thirdChildScore).toHaveTextContent(`${newGame.score}`)
  })

  it("when adding a new entry, shows adjacent entries up to max entries - top", () => {
    // arrange
    const now = Date.now()
    const newGame: ILeaderboardEntry = {
      difficulty: "Crazy Hard",
      endTime: now,
      name: "",
      score: 100,
      startTime: now - secondsToMs(20),
    }

    // act
    const { container } = render(
      <Leaderboard storageKey={STORAGE_KEY} newGame={newGame} />
    )
    const editRow = getByTestId(container, "edit-row")
    const editName = getByTestId(editRow, "edit-name-input")
    const editSaveButton = getByTestId(editRow, "edit-name-save-button")
    fireEvent.change(editName, { target: { value: "Player Middle" } })
    fireEvent.click(editSaveButton)

    // assert
    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(LEADERBOARD_DISPLAY_LENGTH)
    const firstChildScore = getByTestId(leaderboardTbody.childNodes[0] as HTMLElement, "score")
    expect(firstChildScore).toHaveTextContent(`${newGame.score}`)
  })

  it("when adding a new entry, shows adjacent entries up to max entries - bottom", () => {
    // arrange
    const now = Date.now()
    const newGame: ILeaderboardEntry = {
      difficulty: "Crazy Hard",
      endTime: now,
      name: "",
      score: 0,
      startTime: now - secondsToMs(20),
    }

    // act
    const { container } = render(
      <Leaderboard storageKey={STORAGE_KEY} newGame={newGame} />
    )
    const editRow = getByTestId(container, "edit-row")
    const editName = getByTestId(editRow, "edit-name-input")
    const editSaveButton = getByTestId(editRow, "edit-name-save-button")
    fireEvent.change(editName, { target: { value: "Player Middle" } })
    fireEvent.click(editSaveButton)

    // assert
    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(LEADERBOARD_DISPLAY_LENGTH)
    const fifthChildScore = getByTestId(leaderboardTbody.childNodes[4] as HTMLElement, "score")
    expect(fifthChildScore).toHaveTextContent(`${newGame.score}`)
  })

  it("when adding a new entry, shows adjacent entries up to max entries - 2nd top", () => {
    // arrange
    const now = Date.now()
    const newGame: ILeaderboardEntry = {
      difficulty: "Crazy Hard",
      endTime: now,
      name: "",
      score: 99,
      startTime: now - secondsToMs(20),
    }

    // act
    const { container } = render(
      <Leaderboard storageKey={STORAGE_KEY} newGame={newGame} />
    )
    const editRow = getByTestId(container, "edit-row")
    const editName = getByTestId(editRow, "edit-name-input")
    const editSaveButton = getByTestId(editRow, "edit-name-save-button")
    fireEvent.change(editName, { target: { value: "Player Middle" } })
    fireEvent.click(editSaveButton)

    // assert
    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(LEADERBOARD_DISPLAY_LENGTH)
    const secondChildScore = getByTestId(leaderboardTbody.childNodes[1] as HTMLElement, "score")
    expect(secondChildScore).toHaveTextContent(`${newGame.score}`)
  })

  it("when adding a new entry, shows adjacent entries up to max entries - 2nd bottom", () => {
    // arrange
    const now = Date.now()
    const newGame: ILeaderboardEntry = {
      difficulty: "Crazy Hard",
      endTime: now,
      name: "",
      score: 1,
      startTime: now - secondsToMs(20),
    }

    // act
    const { container } = render(
      <Leaderboard storageKey={STORAGE_KEY} newGame={newGame} />
    )
    const editRow = getByTestId(container, "edit-row")
    const editName = getByTestId(editRow, "edit-name-input")
    const editSaveButton = getByTestId(editRow, "edit-name-save-button")
    fireEvent.change(editName, { target: { value: "Player Middle" } })
    fireEvent.click(editSaveButton)

    // assert
    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(LEADERBOARD_DISPLAY_LENGTH)
    const fourthChildScore = getByTestId(leaderboardTbody.childNodes[3] as HTMLElement, "score")
    expect(fourthChildScore).toHaveTextContent(`${newGame.score}`)
  })

  it("reset clears the table immediately", () => {
    // arrange

    // act
    const { container } = render(<Leaderboard storageKey={STORAGE_KEY} />)
    const resetButton = getByTestId(container, "reset-leaderboard-anchor")
    fireEvent.click(resetButton)

    expect(queryByTestId(container, "leaderboard")).not.toBeInstanceOf(
      HTMLElement
    )
    expect(
      queryByTestId(container, "reset-leaderboard-anchor")
    ).not.toBeInstanceOf(HTMLElement)
  })

  it("After reset, hides  table", () => {
    const { container } = render(<Leaderboard storageKey={STORAGE_KEY} />)
    expect(queryByTestId(container, "leaderboard")).not.toBeInstanceOf(
      HTMLElement
    )
  })

  it("After reste, No leaderboard reset link is displayed, as no leaderboard exists", () => {
    const { container } = render(<Leaderboard storageKey={STORAGE_KEY} />)
    expect(
      queryByTestId(container, "reset-leaderboard-anchor")
    ).not.toBeInstanceOf(HTMLElement)
  })
})
