// tslint:disable-next-line:no-implicit-dependencies
import "jest-dom/extend-expect"
import * as React from 'react';
import {
  fireEvent,
  getByTestId,
  queryByTestId,
  render
} from "react-testing-library";
import { Game } from "../src/pages/games/times-table-speed/Game";

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
    const startButton = getByTestId(container, "start-button");

    fireEvent.click(startButton);
    expect(queryByTestId(container, "start-screen")).not.toBeInstanceOf(HTMLElement);
    expect(queryByTestId(container, "play-screen")).toBeInstanceOf(HTMLElement);
  });
})

// const startGame = (container) => {
//   const startButton = getByTestId(container, "start-button");
//   fireEvent.click(startButton);
// }

// const answerQuestion = (container) => {
//   const startButton = getByTestId(container, "start-button");
//   fireEvent.click(startButton);
// }

// describe("Play Screen ", () => {

// })

// describe("Complete Screen - first game", () => {
// })

// describe("Multiple games", () => {
// })

