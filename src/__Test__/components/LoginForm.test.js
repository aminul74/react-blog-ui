import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LoginForm from "../../components/LoginForm";
import { AuthProvider } from "../../ContextApi/AuthContext";

jest.mock("../../ContextApi/AuthContext");
test("LoginForm renders without crashing", () => {
  render(
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );

  expect(screen.queryByTestId("signIn")).toBeDefined();
});
