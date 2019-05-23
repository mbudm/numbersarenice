// tslint:disable-next-line:no-implicit-dependencies
import "jest-dom/extend-expect"
import * as React from "react"
import {
  fireEvent,
  getByTestId,
  queryByTestId,
  render,
} from "react-testing-library"
import { Game, NUM_ROUNDS } from "../src/pages/games/times-table-speed/Game"

const startGame = container => {
  const startButton = getByTestId(container, "start-button")
  fireEvent.click(startButton)
}

const answerAll = (answerInput, answerSubmit) => {
  for (let i = 0; i < NUM_ROUNDS; i++) {
    fireEvent.change(answerInput, { target: { value: i } })
    fireEvent.click(answerSubmit)
  }
}

describe("Start Screen - initial state", () => {
  it("Game loads with initial state of START", () => {
    const { container } = render(<Game />)
    const startScreen = getByTestId(container, "start-screen")
    expect(startScreen).toBeInTheDocument()
  })

  it("No leaderboard is displayed, as no local data exists", () => {
    const { container } = render(<Game />)
    expect(queryByTestId(container, "leaderboard")).not.toBeInstanceOf(
      HTMLElement
    )
  })

  it("No leaderboard reset link is displayed, as no leaderboard exists", () => {
    const { container } = render(<Game />)
    expect(
      queryByTestId(container, "reset-leaderboard-anchor")
    ).not.toBeInstanceOf(HTMLElement)
  })

  it("Start button changes the screen to play screen", () => {
    const { container } = render(<Game />)
    startGame(container)
    expect(queryByTestId(container, "start-screen")).not.toBeInstanceOf(
      HTMLElement
    )
    expect(queryByTestId(container, "play-screen")).toBeInstanceOf(HTMLElement)
  })
})

describe("Play Screen ", () => {
  let container
  let answerInput
  let answerSubmit

  beforeEach(() => {
    ;({ container } = render(<Game />))
    startGame(container)
    expect(queryByTestId(container, "play-screen")).toBeInstanceOf(HTMLElement)
    expect(queryByTestId(container, "question-a")).toBeInstanceOf(HTMLElement)
    expect(queryByTestId(container, "question-b")).toBeInstanceOf(HTMLElement)
    expect(queryByTestId(container, "answer")).toBeInstanceOf(HTMLElement)
    expect(queryByTestId(container, "answer-submit")).toBeInstanceOf(
      HTMLElement
    )

    answerInput = getByTestId(container, "answer")
    answerSubmit = getByTestId(container, "answer-submit")
  })

  it("Answer has focus", () => {
    expect(answerInput).toHaveFocus()
  })

  it("Submit is disabled when input is empty", () => {
    expect(answerSubmit).not.toBeEnabled()
  })

  it("Submit is disabled when input value is non numeric", () => {
    fireEvent.change(answerInput, { target: { value: "xyz" } })
    expect(answerSubmit).not.toBeEnabled()
  })

  it("Submit is enable when input value is numeric", async () => {
    fireEvent.change(answerInput, { target: { value: "2" } })
    expect(answerSubmit).toBeEnabled()
  })

  it("New question when answer is submitted", () => {
    fireEvent.click(answerSubmit)
    expect(answerInput.value).toBe("")
    expect(answerInput).toHaveFocus()
    expect(answerSubmit).not.toBeEnabled()
  })

  it("Change to complete screen when last answer is submitted", () => {
    answerAll(answerInput, answerSubmit)
    expect(queryByTestId(container, "play-screen")).not.toBeInstanceOf(
      HTMLElement
    )
    expect(queryByTestId(container, "complete-screen")).toBeInstanceOf(
      HTMLElement
    )
  })
})

describe("Complete Screen - first game", () => {
  let container
  let answerInput
  let answerSubmit

  beforeEach(() => {
    ({ container } = render(<Game />))
    startGame(container)
    answerInput = getByTestId(container, "answer")
    answerSubmit = getByTestId(container, "answer-submit")
    answerAll(answerInput, answerSubmit)
  })

  it("contains all the complete screen UI", () => {
    expect(queryByTestId(container, "complete-screen")).toBeInstanceOf(
      HTMLElement
    )
    expect(queryByTestId(container, "game-time")).toBeInstanceOf(HTMLElement)
    expect(queryByTestId(container, "game-score")).toBeInstanceOf(HTMLElement)
    expect(queryByTestId(container, "game-summary")).toBeInstanceOf(HTMLElement)
    expect(queryByTestId(container, "reset-button")).toBeInstanceOf(HTMLElement)
    expect(queryByTestId(container, "leaderboard")).toBeInstanceOf(HTMLElement)
  })

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

    fireEvent.change(editName, { target: { value: "Neumann" } })
    fireEvent.click(editSaveButton)

    expect(queryByTestId(editRow, "edit-name-input")).not.toBeInstanceOf(
      HTMLElement
    )
    expect(queryByTestId(editRow, "player-name")).toBeInstanceOf(
      HTMLElement
    )
  })

  it("reset button changes to start screen", () => {
    const resetButton = getByTestId(container, "reset-button")
    fireEvent.click(resetButton)
    expect(queryByTestId(container, "complete-screen")).not.toBeInstanceOf(
      HTMLElement
    )
    expect(queryByTestId(container, "start-screen")).toBeInstanceOf(
      HTMLElement
    )
  })
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

  it("after saving another score, start screen has leaderboard with 2 entries", () => {
    // arranging and acting a lot... hmm.
    startGame(container)
    const answerInput = getByTestId(container, "answer")
    const answerSubmit = getByTestId(container, "answer-submit")
    answerAll(answerInput, answerSubmit)
    const editName = getByTestId(container, "edit-name-input")
    const editSaveButton = getByTestId(container, "edit-name-save-button")
    fireEvent.change(editName, { target: { value: "Neumann" } })
    fireEvent.click(editSaveButton)
    const resetButton = getByTestId(container, "reset-button")
    fireEvent.click(resetButton)

    // assert a lot too
    expect(queryByTestId(container, "start-screen")).toBeInstanceOf(
      HTMLElement
    )
    const leaderboardTbody = getByTestId(container, "leaderboard-tbody")
    expect(leaderboardTbody.childNodes.length).toBe(2)
  })
})
