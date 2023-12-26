import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BlogForm = () => {
  const [isToken, setToken] = useState(
    "Beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3YmI0ZGU4LTcyZmMtNGRhZi04OTk2LTgzN2RmMjJmZTQ1NCIsImlhdCI6MTcwMzU5NTY2MH0.7dK_PlGjsFq-1-5Wq9G3G-YRpmRLdTKjpG2i03Uw91w"
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateBlog = (event) => {
    event.preventDefault();

    if (!isToken) {
      setErrorMessage("You must be logged in to create a blog.");
      return;
    }

    axios
      .post(
        "http://localhost:4001/api/v1/blogs/create",
        {
          title,
          content,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: isToken,
          },
        }
      )
      .then((response) => {
        console.log("Blog created successfully:", response.data);
        setTitle("");
        setContent("");
        setErrorMessage("");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Error creating the blog. Please try again.");
      });
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create a new blog</h2>
      <form onSubmit={handleCreateBlog}>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
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
            !isToken ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isToken}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
