import { useCallback, useState } from "react";
import Button from "./Button";
import DropDownButton from "./DropDownButton";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../ContextApi/AuthContext";
import axios from "axios";
import Modal from "./Modal";
import BlogForm from "./BlogForm";
import ConfirmAlert from "./ConfirmAlert";
import { BeatLoader } from "react-spinners";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Notification from "./Notification";

function BlogDetails() {
  const [isDropDown, setIsDropDown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { token, user } = useAuth();
  const { uuId } = useParams();
  const navigate = useNavigate();
  const [isConfirmAlert, setIsConfirmAlert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [toastPopUp, setToastPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const handleButtonClick = (label) => {
    if (label === "Edit") {
      setOpenModal(true);
      setIsDropDown(false);
      setEdit(true);
    } else if (label === "Delete") {
      setIsConfirmAlert(true);
      setIsDropDown(false);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["blogByUUID", uuId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/v1/blogs/${uuId}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        return response.data;
      } catch (error) {
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs", nextPage, blogsPerPage],
        exact: true,
      });
    },
    staleTime: 10000,
  });

  const blog = data ? data[0] : [];

  const onUpdateBlog = useCallback((message) => {
    setOpenModal(false);
    setMessage(message);
    setToastPopUp(true);
  });

  const { mutate, isPending, isError, Error } = useMutation({
    mutationKey: ["editBlog", uuId, blog],
    mutationFn: async (updatedblog) => {
      return axios.put(
        `http://localhost:4001/api/v1/blogs/${uuId}`,
        updatedblog,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        mutationKey: ["blogByUUID", uuId],
        exact: true,
      });
      onUpdateBlog("Your blog update successfully!");
    },
  });

  const handleSaveEdit = (blog) => {
    mutate(blog);
  };

  const onDeleteBlog = useCallback((message) => {
    setMessage(message);
    setToastPopUp(true);
    setIsConfirmAlert(false);
    navigate("/");
  });

  const {
    mutate: deleteBlog,
    isPending: isDeletePending,
    error,
  } = useMutation({
    mutationKey: ["deleteBlog", uuId],
    mutationFn: async () => {
      console.log("AXIOS");
      await axios.delete(`http://localhost:4001/api/v1/blogs/${uuId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      console.log("INSIDE", uuId);
      queryClient.invalidateQueries({
        mutationKey: ["blogByUUID", uuId],
        exact: true,
      });
      onDeleteBlog("Delete successful");
    },
  });

  const handleDelete = () => {
    deleteBlog();
  };

  const onCancel = () => {
    setIsConfirmAlert(false);
  };

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
        <BeatLoader color="#ffffff" loading={isLoading} />
      </div>
    );
  }

  if (isDeletePending) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
        <BeatLoader color="#ffffff" loading={isDeletePending} />
      </div>
    );
  }

  return (
    <div>
      {toastPopUp && (
        <div>
          <Notification
            message={message}
            onClose={() => setToastPopUp(false)}
            isVisible={setToastPopUp}
          />
        </div>
      )}
      <div className="flex justify-center items-center px-20 py-2 rounded-lg">
        <div className="h-full relative max-w-2xl sm:max-w-2xl md:max-w-2xl lg:max-w-4xl bg-white border border-gray-300 rounded-lg shadow text-black p-20 ">
          {isConfirmAlert && (
            <div>
              <ConfirmAlert
                onCancel={onCancel}
                onConfirm={() => handleDelete(uuId)}
                titleMsg={"Delete"}
                label={"Delete"}
              />
            </div>
          )}

          {user?.id == blog.authorId ? (
            <div className="flex items-center justify-end">
              <Button
                id="dropdownMenuIconHorizontalButton"
                data-dropdown-toggle="dropdownDotsHorizontal"
                className="hover:scale-105 duration-400"
                type="button"
                onClick={handleDropDown}
              >
                <svg
                  className="w-7 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </Button>
            </div>
          ) : null}
          {isDropDown && (
            <div className="dropDown-button">
              <DropDownButton
                labels={["Edit", "Delete"]}
                handleButtonClick={handleButtonClick}
              />
            </div>
          )}

          {Object.keys(blog).length > 0 && (
            <div className="blog-details" key={blog.id}>
              <div className="w-full mx-auto space-y-4 text-center">
                <h1 className="text-2xl font-normal">{blog.title}</h1>
                <div className="text-sm">
                  by
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    target="_blank"
                    className="underline text-violet-400"
                  >
                    <p itemProp="name p-2 font-normal font-bold">
                      {blog.authorId}
                    </p>
                  </a>
                  <div>8 Jan 2024</div>
                </div>
              </div>
              <div className="pt-12 border-t border-gray-200">
                <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold">{blog.title}</h4>
                    <p className="first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-black first-letter:mr-3 first-letter:float-left text-black text-xl font-normal">
                      {blog.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div>
            {openModal && (
              <Modal onClose={() => setOpenModal(false)} open={openModal}>
                <BlogForm
                  onSubmit={handleSaveEdit}
                  title={blog.title}
                  content={blog.content}
                  isEditing={edit}
                  isPending={isPending}
                />
              </Modal>
            )}
          </div>
          <div className="flex justify-end items-center">
            <Button
              href="#"
              className="inline-flex px-4 py-2 text-md font-medium text-center hover:bg-gray-300 mb-5"
              onClick={() => navigate("/")}
            >
              Go Back
            </Button>
          </div>
          {/* {isDeletePending && (
            <BeatLoader color="#ffffff" loading={isLoading} />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
