import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/AuthContext";
import Notification from "./Notification";
import { useBlogContext } from "../Hooks/BlogContext";

const BlogForm = () => {
  const { token, user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { blogList, setBlogList } = useBlogContext();
  const navigate = useNavigate();

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4001/api/v1/blogs/create",
        {
          title,
          content,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogList((prevBlogList) => [...prevBlogList, ...response.data]);
      // setBlogList(response.data);
      console.log("Success", successMessage);
      setSuccessMessage("Blog created successfully!");
      setTitle("");
      setContent("");
      setErrorMessage("");
      setTimeout(clearSuccessMessage, 3000);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error creating the blog. Please try again.");
    }
  };

  const clearSuccessMessage = () => {
    setSuccessMessage("");
  };

  return (
    <div className="form">
      <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create a new blog</h2>
        <form onSubmit={handleCreateBlog}>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && (
            <>
              <h2>Hello World</h2>
              <Notification
                message={successMessage}
                onClose={clearSuccessMessage}
              />
            </>
          )}

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-600"
            >
              Content:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700 ${
              !token ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!token}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
