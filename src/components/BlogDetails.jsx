import { useCallback, useState } from "react";
import Button from "./Button";
import DropDownButton from "./DropDownButton";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../ContextApi/AuthContext";
import Modal from "./Modal";
import BlogForm from "./BlogForm";
import ConfirmAlert from "./ConfirmAlert";
import { BeatLoader } from "react-spinners";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Notification from "./Notification";
import { fetchSingleBlog, updateBlog, deleteBlog } from "../utility/blogAction";
import DisplayBlog from "./DisplayBlog";

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

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blogByUUID", uuId],
    queryFn: async () => fetchSingleBlog(uuId, token),
    staleTime: 16000,
  });

  const onUpdateBlog = useCallback((message) => {
    setOpenModal(false);
    setMessage(message);
    setToastPopUp(true);
  });

  const { mutate, isPending, isError, Error } = useMutation({
    mutationKey: ["editBlog", uuId, blog],
    mutationFn: async (updatedblog) => updateBlog(uuId, updatedblog, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogByUUID", uuId], {
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
    mutate: deleteBlogMutation,
    isPending: isDeletePending,
    error,
  } = useMutation({
    mutationKey: ["deleteBlog", uuId],
    mutationFn: async () => deleteBlog(uuId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      onDeleteBlog("Delete successful");
    },
  });

  const handleDelete = () => {
    deleteBlogMutation();
  };

  const onCancel = () => {
    setIsConfirmAlert(false);
  };

  if (isLoading || isDeletePending) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
        <BeatLoader color="#ffffff" loading={isLoading || isDeletePending} />
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
      <div className="flex justify-center items-center px-10 py-2 rounded-lg">
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

          <div>
            <DisplayBlog blog={blog} />
          </div>
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
              className="inline-flex px-4 py-2 text-md font-medium text-center hover:bg-gray-300 mt-5"
              onClick={() => navigate("/")}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
