import * as React from 'react';
import {
  fireEvent,
  getByTestId,
  render
} from "react-testing-library";
import { Game } from "../src/pages/games/times-table-speed/Game";

it("Game loads with initial state of START", () => {
  const { container } = render(<Game />);
  const countValue = getByTestId(container, "countvalue");
  expect(countValue.textContent).toBe("0");
});

it("Start button works", () => {
  const { container } = render(<Game />);
  const countValue = getByTestId(container, "countvalue");
  const increment = getByTestId(container, "incrementButton");
  const decrement = getByTestId(container, "decrementButton");

  expect(countValue.textContent).toBe("0");

  fireEvent.click(increment);
  expect(countValue.textContent).toBe("1");
  fireEvent.click(decrement);
  expect(countValue.textContent).toBe("0");
});
