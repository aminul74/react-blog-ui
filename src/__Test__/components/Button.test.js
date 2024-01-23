import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../../components/Button";

describe("Button Component", () => {
  test("Test:1 renders button with text", () => {
    const { getByTestId } = render(<Button />);
    expect(getByTestId("Click me")).toBeInTheDocument();
  });

  test("Test:2 handles click event", () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<Button onClick={handleClick} />);
    fireEvent.click(getByTestId("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("Test:3 handles loading state", () => {
    const { getByTestId } = render(<Button loading />);
    expect(getByTestId("Click me")).toHaveTextContent("Processing...");
  });
});
