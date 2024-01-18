import React from "react";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import BlogCard from "../../components/BlogCard";

describe("BlogCard component", () => {
  const sampleBlog = {
    id: 1,
    createdAt: "2022-01-18T12:00:00Z",
    User: {
      username: "exampleUser",
    },
    title: "Example Title",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

  afterEach(cleanup);

  test("Test:1 Blogcard render success", async () => {
    render(
      <Router>
        <BlogCard blog={sampleBlog} />
      </Router>
    );

    fireEvent.click(screen.getByTestId("Read"));

    await waitFor(() => {
      expect(screen.getByTestId("username")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId("title")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId("limitContent")).toBeInTheDocument();
    });
  });

  test("Test:2 FormatData render success", () => {
    render(
      <Router>
        <BlogCard blog={sampleBlog} />
      </Router>
    );
    expect(screen.getByTestId("formatedData")).toBeInTheDocument();
    expect(screen.getByTestId("formatedData")).toHaveTextContent(
      "Jan 18, 2022"
    );
  });
});
