import React from "react";
import { useState, useCallback } from "react";
import { useAuth } from "../ContextApi/AuthContext";
import BlogForm from "../components/BlogForm";
import BlogCard from "../components/BlogCard";
import { useBlogContext } from "../ContextApi/BlogContext";
import Notification from "../components/Notification";
import HeroSection from "../components/HeroSection";
import Modal from "../components/Modal";
import CreateBlogButton from "../components/CreateBlogButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import Pagination from "../components/Pagination";
import { fetchBlogs, createBlogMutation } from "../utility/blogAction";

const BlogsPage = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [toastPopUp, setToastPopUp] = useState(false);
  const { pageNumber, setPageNumber } = useBlogContext();
  const nextPage = pageNumber + 1;
  const blogsPerPage = 6;

  const changePage = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["blogs", nextPage, blogsPerPage],
    queryFn: async () => fetchBlogs(nextPage, blogsPerPage),
    staleTime: 16000,
  });

  const blogs = data ? data[0] : [];
  const totalCount = data ? data[1] : [];
  const onCreateBlog = useCallback((message) => {
    setOpenModal(false);
    setMessage(message);
    setToastPopUp(true);
  });

  const afterCreate = () => {
    setToastPopUp(false);
  };

  const { mutate, isPending, isError, Error } = useMutation({
    mutationFn: async (blog) => createBlogMutation(blog, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs", nextPage, blogsPerPage], {
        exact: true,
      });
      onCreateBlog("Blog created successfully!");
    },
  });

  const handleCreateBlog = (blog) => {
    mutate(blog);
  };

  if (isLoading) {
    return (
      <div
        data-testid="loading-spinner"
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50"
      >
        <BeatLoader color="#ffffff" loading={isLoading} />
      </div>
    );
  }

  return (
    <div className="relative">
      {toastPopUp && (
        <div>
          <Notification
            message={message}
            onClose={afterCreate}
            isVisible={setToastPopUp}
          />
        </div>
      )}

      {token && (
        <div data-testid="Create Blog">
          <CreateBlogButton onClick={() => setOpenModal(true)} />
        </div>
      )}

      <div>
        <Modal
          data-testid="modal"
          onClose={() => setOpenModal(false)}
          open={openModal}
        >
          <BlogForm
            onSubmit={handleCreateBlog}
            title=""
            content=""
            isPending={isPending}
            data-testid="blog-form"
          />
        </Modal>
      </div>
      <div>
        <HeroSection />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-6 max-w-screen-xl mx-auto mt-5">
        {blogs && blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>

      <div>
        <Pagination
          pageNumber={pageNumber}
          totalCount={totalCount}
          changePage={changePage}
        />
      </div>
    </div>
  );
};

export default BlogsPage;
