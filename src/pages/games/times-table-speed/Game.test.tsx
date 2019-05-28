// tslint:disable-next-line:no-implicit-dependencies
import "jest-dom/extend-expect"
import * as React from "react"
import {
  fireEvent,
  getByTestId,
  queryByTestId,
  render,
} from "react-testing-library"
import { Game, NUM_ROUNDS } from "./Game"

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
    ({ container } = render(<Game />))
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

  it("game score is a positive between 0 and 100", () => {
    const gameScoreEl = getByTestId(container, "game-score")
    const gameScore = parseFloat(gameScoreEl.textContent)
    expect(gameScore).toBeGreaterThanOrEqual(0)
    expect(gameScore).toBeLessThanOrEqual(100)
  })

  it("game time is a positive number of seconds", () => {
    const gameTimeEl = getByTestId(container, "game-time")
    const gameTime = parseFloat(gameTimeEl.textContent)
    expect(gameTime).toBeGreaterThan(0)
  })

  it("game time is also reflected in leaderboard", () => {
    const gameTimeEl = getByTestId(container, "game-time")
    const leaderboard = getByTestId(container, "leaderboard")
    const editRow = getByTestId(leaderboard, "edit-row")
    const editRowTimeEl = getByTestId(editRow, "time")
    // fuzzy match as slight delay in rendering means sometimes
    // the child component doesn't have the update in time for this test
    // so have added a hacky fix in gameTime to take current timestamp
    // basically the time for the game comes in at ~ 0.01 vs 0.02
    expect(parseFloat(gameTimeEl.textContent)).toBeCloseTo(parseFloat(editRowTimeEl.textContent), 1)
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

