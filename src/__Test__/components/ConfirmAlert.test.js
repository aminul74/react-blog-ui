import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmAlert from "../../components/ConfirmAlert";

describe("Confirm Alert ", () => {
  test("Test:1 renders ConfirmAlert component", () => {
    render(
      <ConfirmAlert
        onCancel={() => {}}
        onConfirm={() => {}}
        titleMsg="delete"
        label="Delete"
      />
    );
    expect(
      screen.getByText(/Are you sure you want to delete\?/i)
    ).toBeDefined();
  });

  test("Test:2 onClick confirmation", () => {
    const mockOnConfirm = jest.fn();
    render(
      <ConfirmAlert
        onCancel={() => {}}
        onConfirm={mockOnConfirm}
        titleMsg="delete"
        label="Delete"
      />
    );
    fireEvent.click(screen.getByText("Delete"));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  test("Test:3 onCancel confirmation", () => {
    const mockOnCancel = jest.fn();
    render(
      <ConfirmAlert
        onCancel={mockOnCancel}
        onConfirm={() => {}}
        titleMsg="delete"
        label="Delete"
      />
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
