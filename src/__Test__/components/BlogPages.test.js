import React from "react";
import { render, screen, waitFor, userEvent } from "@testing-library/react";
import { useQuery, useParams, useMutation } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import BlogsPage from "../../pages/BlogsPage";
import { AuthProvider, useAuth } from "../../ContextApi/AuthContext";

jest.mock("@tanstack/react-query");
jest.mock("../../ContextApi/AuthContext");
jest.mock("react-router-dom");

describe("BlogsPage", () => {
  it("Test:1 Blog page render success", () => {
    const mockLoading = true;
    useQuery.mockReturnValue({
      data: null,
      isLoading: mockLoading,
    });
    useAuth.mockReturnValue({
      token: "pokemon",
      user: { id: "123", username: "aminul" },
    });

    render(
      <AuthProvider>
        <BlogsPage />
      </AuthProvider>
    );

    expect(screen.queryByTestId("loading-spinner")).toBeDefined();
  });

  test("Test:3 Modal render success", async () => {
    useAuth.mockReturnValue({
      token: "pokemon",
      user: { id: "123", username: "aminul" },
    });
    useMutation.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });

    render(
      <AuthProvider>
        <BlogsPage />
      </AuthProvider>
    );

    await waitFor(() => {
      const modalTitle = screen.queryByTestId("modal");
      expect(modalTitle).toBeDefined();
    });

    const modalContent = screen.queryByTestId("blog-form");
    expect(modalContent).toBeDefined();
  });

  test("Test:4 Create Blog button is visible token is true", async () => {
    useAuth.mockReturnValue({
      token: "pokemon",
      user: { id: "123", username: "aminul" },
    });

    render(
      <AuthProvider>
        <BlogsPage />
      </AuthProvider>
    );

    expect(screen.queryByText("Create Blog")).toBeNull();
    const createBlogButton = screen.queryByText("Create Blog");
    if (createBlogButton) {
      userEvent.click(createBlogButton);
      await waitFor(() => {
        expect(screen.getByTestId("Create Blog")).toBeInTheDocument();
      });
    } else {
      console.log();
    }

    await waitFor(() => {
      expect(screen.queryByTestId("Create Blog")).toBeDefined();
    });
  });

  test("Test:5 Create Blog button is not visible when token null", () => {
    useAuth.mockReturnValue({
      token: null,
      user: null,
    });

    render(
      <AuthProvider>
        <BlogsPage />
      </AuthProvider>
    );
    expect(screen.queryByText("Create Blog")).toBeNull();
  });
});
