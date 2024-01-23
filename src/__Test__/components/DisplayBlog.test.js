import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DisplayBlog from "../../components/DisplayBlog";
import "@testing-library/jest-dom";

const mockBlog = {
  id: 1,
  title: "Test Blog",
  content: "Test content for the blog.",
  createdAt: "21 Jan 2024",
  User: {
    username: "testuser",
  },
};
describe("DisplayBlog", () => {
  test("Test:1 DisplayBlog render success", async () => {
    render(<DisplayBlog blog={mockBlog} />);
    expect(screen.queryByTestId("createBlogBtn")).toBeDefined();
  });

  test("displays formatted blog date", async () => {
    render(<DisplayBlog blog={mockBlog} />);
    expect(screen.queryByTestId("date")).toBeDefined();

    await waitFor(() => {
      expect(screen.queryByTestId("username")).toBeInTheDocument();
    });
  });
});
