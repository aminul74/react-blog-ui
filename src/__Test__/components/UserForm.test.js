import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserFormPage from "../../pages/UserFormPage";
import { AuthProvider, useAuth } from "../../ContextApi/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("../../ContextApi/AuthContext");

describe("UserFormPage", () => {
  test("Test: Render Login Form by Default", () => {
    const queryClient = new QueryClient();

    useAuth.mockReturnValue({
      login: jest.fn(),
      getUser: jest.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <UserFormPage />
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    );

    const loginForm = screen.queryByTestId("login-form");
    expect(loginForm).toBeDefined();

    const signupForm = screen.queryByTestId("signup-form");
    expect(signupForm).not.toBeInTheDocument();
  });
});
