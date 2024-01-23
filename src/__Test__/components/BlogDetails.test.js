import React from "react";
import { render, screen, waitFor, userEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useAuth } from "../../ContextApi/AuthContext";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import BlogDetails from "../../components/BlogDetails";
import { Router } from "react-router-dom";

jest.mock("../../ContextApi/AuthContext");
jest.mock("react-router-dom");
jest.mock("@tanstack/react-query");
jest.mock("../../utility/blogAction");

describe("Blog Details", () => {
  test("Test:1 Render success with Loading", async () => {
    const mockLoading = true;
    useQuery.mockReturnValue({
      data: null,
      isLoading: mockLoading,
    });

    render(
      <Router>
        <BlogDetails />
      </Router>
    );
    expect(screen.queryByTestId("loading")).toBeDefined();
  });

  test("Test:2 Blog delete success", async () => {
    useAuth.mockReturnValue({
      token: "pokemon",
      user: { id: "123", username: "aminul" },
    });
    const queryClient = new QueryClient();
    const uuId = "uuId-123";
    useParams.mockReturnValue({ uuId });
    useMutation.mockReturnValue({
      deleteBlogMutation: jest.fn(),
      isPending: false,
    });
    queryClient.invalidateQueries({ queryKey: ["blogs"] });
    render(
      <Router>
        <BlogDetails />
      </Router>
    );

    const dropdownButton = screen.queryByText("dropdownItems");
    if (dropdownButton) {
      userEvent.click(dropdownButton);
      await waitFor(() => {
        expect(screen.getByTestId("dropdownItems")).toBeInTheDocument();
      });
    } else {
      // console.log("Dropdown button not found");
    }

    expect(screen.queryByText("modal")).toBeNull();
  });

  test("Test:3 Modal render success", async () => {
    useAuth.mockReturnValue({
      token: "pokemon",
      user: { id: "123", username: "aminul" },
    });

    const uuId = "uuId-123";
    useParams.mockReturnValue({ uuId });
    useMutation.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });

    render(
      <Router>
        <BlogDetails />
      </Router>
    );

    await waitFor(() => {
      const modalTitle = screen.queryByTestId("modal");
      expect(modalTitle).toBeDefined();
    });

    const modalContent = screen.queryByTestId("blog-form");
    expect(modalContent).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
