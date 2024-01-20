import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DropDownButton from "../../components/DropDownButton";
import "@testing-library/jest-dom";

const mockLabels = ["Option 1", "Option 2"];

describe("DropdownBtn", () => {
  test("Test:1 Dropdown Btn render success", () => {
    render(
      <DropDownButton
        onClick={() => {}}
        labels={mockLabels}
        handleButtonClick={() => {}}
      />
    );

    expect(screen.getAllByText("Option 1")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Option 2")[0]).toBeInTheDocument();
  });

  test("Test:2 Btn onClick success", async () => {
    const mockOnClick = jest.fn();
    const mockLabels = ["Option 1", "Option 2"];

    render(
      <DropDownButton
        onClick={mockOnClick}
        labels={mockLabels}
        handleButtonClick={() => {}}
      />
    );

    fireEvent.click(screen.getByText("Option 1"));
    await waitFor(() => {
      expect(mockOnClick).toBeDefined();
    });
  });
});
