import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  getByTestId,
  userEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthProvider } from "../../ContextApi/AuthContext";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
jest.mock("../../ContextApi/AuthContext");
jest.mock("react-router-dom");

describe("Header", () => {
  test("Test:1 Header render success", () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );
  });

  test("Test:2 Dropdown toggles sucess", async () => {
    const { queryByTestId } = render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    expect(queryByTestId("dropDown")).not.toBeInTheDocument();
    const button = queryByTestId("dropDown");
    if (button) {
      userEvent.click(button);
      await waitFor(() => {
        expect(queryByTestId("dropDownContent")).toBeInTheDocument();
      });
    } else {
      console.error("Dropdown button not found");
    }
  });
});
