import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateBlogButton from "../../components/CreateBlogButton";

describe("CreateBlogButton", () => {
  test("Test:1 Btn render success", () => {
    render(<CreateBlogButton onClick={() => {}} />);
    expect(screen.getByText(/Create Blog/i)).toBeDefined();
  });

  test("Test:2 onClick working success", () => {
    const mockOnClick = jest.fn();
    render(<CreateBlogButton onClick={mockOnClick} />);
    fireEvent.click(screen.getByText("Create Blog"));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
