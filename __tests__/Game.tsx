// tslint:disable-next-line:no-implicit-dependencies
import "jest-dom/extend-expect"
import * as React from 'react';
import {
  fireEvent,
  getByTestId,
  queryByTestId,
  render,
} from "react-testing-library";
import { Game } from "../src/pages/games/times-table-speed/Game";

const startGame = (container) => {
  const startButton = getByTestId(container, "start-button");
  fireEvent.click(startButton);
}


describe("Start Screen - initial state", () => {

  it("Game loads with initial state of START", () => {
    const { container } = render(<Game />);
    const startScreen = getByTestId(container, "start-screen");
    expect(startScreen).toBeInTheDocument()
  });

  it("No leaderboard is displayed, as no local data exists", () => {
    const { container } = render(<Game />);
    expect(queryByTestId(container, "leaderboard")).not.toBeInstanceOf(HTMLElement);
  })

  it("No leaderboard reset link is displayed, as no leaderboard exists", () => {
    const { container } = render(<Game />);
    expect(queryByTestId(container, "reset-leaderboard-anchor")).not.toBeInstanceOf(HTMLElement);
  })

  it("Start button changes the screen to play screen", () => {
    const { container } = render(<Game />);
    startGame(container)
    expect(queryByTestId(container, "start-screen")).not.toBeInstanceOf(HTMLElement);
    expect(queryByTestId(container, "play-screen")).toBeInstanceOf(HTMLElement);
  });
})



describe("Play Screen ", () => {
  let container;
  let rerender;
  let answerInput;
  let answerSubmit;

  beforeEach(() => {
    ({container, rerender} = render(<Game />))
    startGame(container)
    expect(queryByTestId(container, "play-screen")).toBeInstanceOf(HTMLElement);
    expect(queryByTestId(container, "question-a")).toBeInstanceOf(HTMLElement);
    expect(queryByTestId(container, "question-b")).toBeInstanceOf(HTMLElement);
    expect(queryByTestId(container, "answer")).toBeInstanceOf(HTMLElement);
    expect(queryByTestId(container, "answer-submit")).toBeInstanceOf(HTMLElement);

    answerInput = getByTestId(container, "answer");
    answerSubmit = getByTestId(container, "answer-submit");
  });

  it("Answer has focus", () => {
    expect(answerInput).toHaveFocus()
  })

  it("Submit is disabled when input is empty", () => {
    expect(answerSubmit).not.toBeEnabled()
  })

  it("Submit is disabled when input value is non numeric", () => {
    fireEvent.change(answerInput, {target: {value: 'xyz'}})
    expect(answerSubmit).not.toBeEnabled()
  })

  it("Submit is enable when input value is numeric", async () => {
    fireEvent.change(answerInput, {target: {value: "2"}})
    expect(answerSubmit).toBeEnabled()
  })

  it("New question when answer is submitted", () => {
    fireEvent.click(answerSubmit)
    expect(answerInput.value).toBe("")
    expect(answerInput).toHaveFocus()
    expect(answerSubmit).not.toBeEnabled()
  })
})

// describe("Complete Screen - first game", () => {
// })

// describe("Multiple games", () => {
// })

