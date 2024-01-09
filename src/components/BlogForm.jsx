import { useState, useEffect } from "react";
import { useAuth } from "../ContextApi/AuthContext";

const BlogForm = ({ onSubmit, title, content }) => {
  const { token } = useAuth();
  const [localTitle, setLocalTitle] = useState('');
  const [localContent, setLocalContent] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    const blog = {
      title: localTitle,
      content: localContent,
    };
    onSubmit(blog);
  };
  useEffect(() => {
    setLocalTitle(title);
    setLocalContent(content);
  }, [title, content]);

  const handleTitleChange = (event) => {
    setLocalTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setLocalContent(event.target.value);
  };

  return (
    <div className="form">
      <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create a new blog</h2>
        <form onSubmit={submitForm}>
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
              value={localTitle}
              onChange={handleTitleChange}
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
              value={localContent}
              onChange={handleContentChange}
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
