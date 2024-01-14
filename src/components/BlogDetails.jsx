import { useEffect, useState } from "react";
import Button from "./Button";
import DropDownButton from "./DropDownButton";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../ContextApi/AuthContext";
import axios from "axios";
import Modal from "./Modal";
import BlogForm from "./BlogForm";
import { useBlogContext } from "../ContextApi/BlogContext";
import ConfirmAlert from "./ConfirmAlert";
function BlogDetails() {
  const [isDropDown, setIsDropDown] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { setBlogList } = useBlogContext();
  const { token, logout, user } = useAuth();
  const { uuId } = useParams();
  const navigate = useNavigate();
  const [isConfirmAlert, setIsConfirmAlert] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  console.log("ID", currentBlog.authorId);
  console.log("User", user.id);
  const handleButtonClick = (label) => {
    if (label === "Edit") {
      setOpenModal(true);
      setIsDropDown(false);
      setEdit(true);
    } else if (label === "Delete") {
      setIsConfirmAlert(true);
      setIsDropDown(false);
      // handleDelete(uuId);
    }
  };

  const havePermission = (uuId) => {
    handleDelete(uuId);
  };

  const onCancel = () => {
    setIsConfirmAlert(false);
  };

  useEffect(() => {
    const blogByUUId = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4001/api/v1/blogs/${uuId}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentBlog(res.data[0]);

        console.log("Data", res.data);
      } catch (error) {
        console.error("Error getting blog:", error);
      }
    };
    blogByUUId();
  }, [uuId, token]);

  const handleSaveEdit = async (blog) => {
    try {
      const res = await axios.put(
        `http://localhost:4001/api/v1/blogs/${uuId}`,
        blog,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentBlog(res.data[0]);
      // Get Updated Blog
      const updatedBlogs = await axios.get(
        "http://localhost:4001/api/v1/blogs"
      );

      setBlogList(updatedBlogs.data);
      setOpenModal(false);
    } catch (error) {
      console.error("Error editing the blog:", error);
    }
  };

  const handleDelete = async (uuId) => {
    // console.log("jhgjgggg");
    try {
      await axios.delete(`http://localhost:4001/api/v1/blogs/${uuId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      setBlogList((prevBlogs) => prevBlogs.filter((blog) => blog.id !== uuId));
      navigate("/");
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
  };

  return (
    <div>
      {/* <div class="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md"> */}
      <div className="flex justify-center items-center px-20 py-2 rounded-lg">
        <div className="h-full relative max-w-2xl sm:max-w-2xl md:max-w-2xl lg:max-w-4xl bg-white border border-gray-300 rounded-lg shadow text-black p-20 ">
          {isConfirmAlert && (
            <div>
              <ConfirmAlert
                onCancel={onCancel}
                onConfirm={() => havePermission(uuId)}
                titleMsg={"Delete"}
                label={"Delete"}
              />
            </div>
          )}

          {user.id == currentBlog.authorId ? (
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

          {Object.keys(currentBlog).length > 0 && (
            <div className="blog-details" key={currentBlog.id}>
              <div className="w-full mx-auto space-y-4 text-center">
                <h1 className="text-2xl font-normal">{currentBlog.title}</h1>
                <div className="text-sm">
                  by
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    target="_blank"
                    className="underline text-violet-400"
                  >
                    <p itemProp="name p-2 font-normal font-bold">
                      {currentBlog.authorId}
                    </p>
                  </a>
                  <div>8 Jan 2024</div>
                </div>
              </div>
              <div className="pt-12 border-t border-gray-200">
                <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold">{currentBlog.title}</h4>
                    <p className="first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-black first-letter:mr-3 first-letter:float-left text-black text-xl font-normal">
                      {currentBlog.content}
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
                  title={currentBlog.title}
                  content={currentBlog.content}
                  isEditing={edit}
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
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
