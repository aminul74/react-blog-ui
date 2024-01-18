import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthProvider, useAuth } from "../../ContextApi/AuthContext";
import BlogDetails from "../../components/BlogDetails";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { fetchBlogs, fetchSingleBlog } from "../../utility/blogAction";

const mockUseNavigate = jest.fn();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const mockReturnValue = {
  token: "pokemon",
  user: { id: "1", name: "aminul" },
};

jest.mock("../../ContextApi/AuthContext", () => ({
  useAuth: jest.fn(() => mockReturnValue),
}));

jest.mock("../../utility/blogAction", () => ({
  fetchBlogs: jest.fn(),
  fetchSingleBlog: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

describe("BlogDetails Component", () => {
  test("Test:1 BlogDetails render success", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BlogDetails />
        </AuthProvider>
      </QueryClientProvider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("displays loading spinner while data is loading", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BlogDetails />
        </AuthProvider>
      </QueryClientProvider>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  // test("displays blog details when data is loaded", async () => {
  //   render(<BlogDetails />);

  //   await waitFor(() => {
  //     expect(screen.queryByTestId("loader")).toBeNull();
  //   });

  //   expect(screen.getByText(/blog title/i)).toBeInTheDocument();
  //   expect(screen.getByText(/blog content/i)).toBeInTheDocument();
  // });

  // test("toggles dropdown state on button click", () => {
  //   render(<BlogDetails />);
  //   const dropdownButton = screen.getByTestId(
  //     "dropdownMenuIconHorizontalButton"
  //   );
  //   fireEvent.click(dropdownButton);

  //   expect(screen.getByTestId("dropdownMenu")).toBeInTheDocument(); // Adjust this based on your actual structure
  // });
});
