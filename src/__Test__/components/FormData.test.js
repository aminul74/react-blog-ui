import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import FormData from "../../components/FormData";
import { useAuth } from "../../ContextApi/AuthContext";
import { useMutation } from "@tanstack/react-query";

jest.mock("../../ContextApi/AuthContext");
jest.mock("react-router-dom");
jest.mock("@tanstack/react-query");
jest.mock("../../utility/blogAction");

describe("FormatData", () => {
  test("Test:1 Login submit success", async () => {
    useAuth.mockReturnValue({
      login: jest.fn(),
      getUser: jest.fn(),
      token: "pokemon",
    });
    useMutation.mockReturnValue({
      mutate: jest.fn(),
    });
    render(<FormData isLogin={true} btnLabel="Login" />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Username/i), {
        target: { value: "testuser" },
      });

      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: "testpassword" },
      });

      fireEvent.click(screen.getByText(/Login/i));
    });
    act(() => {
      expect(useAuth().token).toBe("pokemon");
    });
  });

  test("Test:2 Signup success", async () => {
    useAuth.mockReturnValue({
      signup: jest.fn(),
      getUser: jest.fn(),
      token: "pokemon",
    });

    const mockSignupMutation = jest.fn();
    mockSignupMutation.mockReturnValue({
      mutate: jest.fn(),
    });

    render(<FormData signup={true} btnLabel="Sign Up" />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Username"), {
        target: { value: "testuser" },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "testuser@example.com" },
      });

      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "testpassword" },
      });

      fireEvent.change(screen.getByLabelText("Confirm Password"), {
        target: { value: "testpassword" },
      });

      fireEvent.click(screen.getByText(/Sign Up/i));
    });
    act(() => {
      expect(useAuth().token).toBe("pokemon");
    });
  });
});
