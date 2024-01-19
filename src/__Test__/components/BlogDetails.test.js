import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import BlogDetails from "../../components/BlogDetails";
import { useAuth } from "../../ContextApi/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSingleBlog } from "../../utility/blogAction";

jest.mock("../../ContextApi/AuthContext");
jest.mock("react-router-dom");
jest.mock("@tanstack/react-query");
jest.mock("../../utility/blogAction");

describe("Blog Details", () => {
  beforeEach(() => {
    const mockNavigate = jest.fn();
    useAuth.mockReturnValue({ token: "pokemon", user: { id: "aminul" } });

    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ yourParamName: "uuId-123" });

    useQueryClient.mockReturnValue({
      invalidateQueries: jest.fn(),
      getQueryData: jest.fn(),
    });

    // useQuery.mockReturnValue({
    //   data: "mockedData",
    //   isLoading: true,
    // });

    useMutation.mockReturnValue({
      mutate: jest.fn(),
    });

    const sampleBlog = {
      id: 1,
      title: "Hello world",
      content: "Good Morning",
      authorId: 123,
    };
  });

  test("Test:1 render success", async () => {
    fetchSingleBlog.mockImplementation(() => Promise.resolve(sampleBlog));

    useQuery.mockReturnValue({
      data: "mockedData",
      isLoading: true,
    });

    render(<BlogDetails />);

    // await waitFor(() => {
    //   expect(screen.getByTestId("loader")).toBeInTheDocument();
    // });
  });

  test("Test:2 Blog get and loading stopped", async () => {
    useQuery.mockReturnValue({
      data: "mockedData",
      isLoading: false,
    });
    render(<BlogDetails />);

    // await waitFor(() => {
    // expect(screen.getByTestId("loader")).not.toBeInTheDocument();
    // });
  });

  // test("Test:3 Blog edit success", async () => {
  //   useMutation.mockReturnValue({
  //     handleSaveEdit: "mockedData",
  //     isPending: false,
  //     isError: false,
  //   });

  //   render(<BlogDetails />);
  //   await waitFor(() => {
  //     expect(screen.getByTestId("modal")).toBeInTheDocument();
  //   });
  //   await waitFor(() => {
  //     expect(screen.getByTestId("blog-form")).toBeInTheDocument();
  //   });
  //   await waitFor(() => {
  //     expect(screen.getByTestId("loader")).not.toBeInTheDocument();
  //   });
  // });

  // test("Test:4 Dropdown button interaction", async () => {
  //   useQuery.mockReturnValue({
  //     data: "mockedData",
  //     isLoading: false,
  //   });

  //   render(<BlogDetails />);

  //   expect(screen.getByTestId("dropdownItems")).toBeInTheDocument();

  //   fireEvent.click(screen.getByRole("dropDown-button", { name: "Edit" }));

  //   expect(screen.getByTestId("blog-form")).toBeInTheDocument();

  //   await waitFor(() => {
  //     expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  //   });
  // });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
