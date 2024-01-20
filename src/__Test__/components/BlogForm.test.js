import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BlogForm from "../../components/BlogForm";
import { useAuth } from "../../ContextApi/AuthContext";
import { AuthProvider } from "../../ContextApi/AuthContext";
import "@testing-library/jest-dom";
jest.mock("../../ContextApi/AuthContext");

describe("BlogForm Component", () => {
  test("Test:1 renders without errors", () => {
    useAuth.mockReturnValue({
      token: "pokemon",
    });
    render(<BlogForm />);
  });

  test("Test:2 input field has correct value", () => {
    const mockOnSubmit = jest.fn();
    const initialTitle = "Initial Title";

    render(<BlogForm onSubmit={mockOnSubmit} title={initialTitle} />);

    const titleInput = screen.getByTestId("title-input");

    expect(titleInput).toHaveValue(initialTitle);

    const newTitle = "New Title";

    fireEvent.change(titleInput, {
      target: { value: newTitle },
    });

    expect(titleInput).toHaveValue(newTitle);

    expect(titleInput).toHaveClass(
      "w-full mt-1 p-2 border rounded focus:outline-none focus:border-blue-500"
    );
  });

  test("Submit Functionality", async () => {
    const mockSubmit = jest.fn();

    jest.mock("react-hook-form", () => ({
      useForm: jest.fn(() => ({
        register: jest.fn(),
        handleSubmit: (callback) => callback,
        formState: { errors: {} },
      })),
    }));

    render(
      <BlogForm
        onSubmit={mockSubmit}
        title="Test Title"
        content="Test Content"
        isEditing={false}
        isPending={false}
      />
    );

    fireEvent.change(screen.getByLabelText("Title:"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText("Content:"), {
      target: { value: "Test Content" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        title: "Test Title",
        content: "Test Content",
      });
    });
  });
});
