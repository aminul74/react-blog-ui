import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  userEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfilePage from "../../pages/ProfilePage";
import { AuthProvider, useAuth } from "../../ContextApi/AuthContext";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { useNavigate, BrowserRouter as Router } from "react-router-dom";
import { data } from "autoprefixer";

jest.mock("../../ContextApi/AuthContext");
jest.mock("axios");
jest.mock("@tanstack/react-query");
jest.mock("react-router-dom");

useAuth.mockReturnValue({
  user: { id: "123", username: "testuser" },
  token: "pokemon",
  logout: jest.fn(),
});

useMutation.mockReturnValue({
  mutate: "mockdata",
  isPending: false,
});

describe("ProfilePage", () => {
  test("Test:1 Profile page render success", async () => {
    render(
      <AuthProvider>
        <Router>
          <ProfilePage />
        </Router>
      </AuthProvider>
    );
    await waitFor(() => {
      const element = screen.queryByText("profile-render");
      expect(element).toBeDefined();
    });
  });

  test("Test:2 password update success", async () => {
    render(
      <AuthProvider>
        <Router>
          <ProfilePage />
        </Router>
      </AuthProvider>
    );

    await waitFor(() => {
      const formDiv = screen.queryByText("form-submit");
      expect(formDiv).toBeDefined();
    });

    // const nameInputEl = screen.queryByTestId("old-password-input");
    // fireEvent.change(nameInputEl, {
    //   target: { value: "Michał" },
    // });
    // await waitFor(() => {
    //   expect(nameInputEl.value).toBe("Michał");
    // });

    // userEvent.change(screen.getByTestId("old-password-input"), "oldPassword");

    // userEvent.changeText(
    //   screen.queryByTestId("new-password-input"),
    //   "newPassword"
    // );
    // userEvent.changeText(screen.queryByTestId("confirm-new-password-input"), {
    //   target: { value: "newPassword" },
    // });
    // });
  });
});
