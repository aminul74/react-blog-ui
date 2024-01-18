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
import BlogDetails from "../../components/BlogDetails";
import { AuthProvider } from "../../ContextApi/AuthContext";

describe("BlogDetails", () => {
  const sampleBlog = {
    id: "1",
    createdAt: "2022-01-18T12:00:00Z",
    User: {
      id: "123",
      username: "aminul",
    },
    title: "Hello World",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };
  it("Test: 1 BlogDetails render success", () => {
    render(
      <Router>
        <AuthProvider>
          <BlogDetails />
        </AuthProvider>
      </Router>
    );
  });
});
