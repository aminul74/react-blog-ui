import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useAuth } from "../../ContextApi/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  useMutation,
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { fetchSingleBlog } from "../../utility/blogAction";
import BlogDetails from "../../components/BlogDetails";
import { Router } from "react-router-dom";

jest.mock("../../ContextApi/AuthContext");
jest.mock("react-router-dom");
jest.mock("@tanstack/react-query");
jest.mock("../../utility/blogAction");

describe("Blog Details", () => {
  test("Test:1 Render success with Loading", async () => {
    // const mockQuery = jest.fn();
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

  test("Test:2 Blog edit success with mutation", async () => {
    const queryClient = new QueryClient();
    const uuId = "uuId-123";
    useMutation.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });

    queryClient.invalidateQueries(["blogByUUID", uuId], {
      exact: true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <BlogDetails />
        </Router>
      </QueryClientProvider>
    );

    expect(screen.queryByText("modal")).toBeNull();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
