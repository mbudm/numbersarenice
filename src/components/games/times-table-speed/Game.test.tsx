// tslint:disable-next-line:no-implicit-dependencies
import "jest-dom/extend-expect"
import * as React from "react"
import {
  fireEvent,
  getByLabelText,
  getByTestId,
  queryByTestId,
  render,
} from "react-testing-library"
import { gameDifficulty, NUM_ROUNDS_INIT } from "./constants"
import { Game } from "./Game"

const startGame = container => {
  const startButton = getByTestId(container, "start-button")
  fireEvent.click(startButton)
}

const answerAll = (answerInput, answerSubmit) => {
  for (let i = 0; i < NUM_ROUNDS_INIT; i++) {
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
    ;({ container } = render(<Game />))
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
    expect(queryByTestId(container, "game-summary-toggle")).toBeInstanceOf(HTMLElement)
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

    expect(gameTimeEl.textContent).toBe(editRowTimeEl.textContent)
  })

  it("reset button changes to start screen", () => {
    const resetButton = getByTestId(container, "reset-button")
    fireEvent.click(resetButton)
    expect(queryByTestId(container, "complete-screen")).not.toBeInstanceOf(
      HTMLElement
    )
    expect(queryByTestId(container, "start-screen")).toBeInstanceOf(HTMLElement)
  })
})

describe("Game Settings", () => {
  it("generates a game with the selected rounds and difficulty", () => {
    const rounds = 5
    const difficulty = 1
    const { container } = render(<Game />)
    const selectDifficulty = getByLabelText(container, "Difficulty", { selector: "select" })
    const selectRounds = getByLabelText(container, "Rounds", { selector: "select" })
    fireEvent.change(selectDifficulty, { target: { value: difficulty } })
    fireEvent.change(selectRounds, { target: { value: rounds } })

    // answer all, collecting the question arguments
    const questions = []
    startGame(container)
    for (let i = 0; i < rounds; i++) {
      const a = parseInt(getByTestId(container, "question-a").textContent, 10)
      const b = parseInt(getByTestId(container, "question-b").textContent, 10)
      questions.push({ a, b })
      const answerInput = getByTestId(container, "answer")
      const answerSubmit = getByTestId(container, "answer-submit")
      fireEvent.change(answerInput, { target: { value: (a * b) } })
      fireEvent.click(answerSubmit)
    }

    // all questions should match selected difficulty/rounds
    expect(queryByTestId(container, "play-screen")).not.toBeInstanceOf(
      HTMLElement
    )
    expect(queryByTestId(container, "complete-screen")).toBeInstanceOf(
      HTMLElement
    )
    expect(questions.length).toBe(rounds)
    questions.forEach(q => {
      expect(gameDifficulty[difficulty].a).toContain(q.a)
      expect(gameDifficulty[difficulty].b).toContain(q.b)
    })
    const score = getByTestId(container, "game-score")
    expect(score).toHaveTextContent("100")
  })
})
