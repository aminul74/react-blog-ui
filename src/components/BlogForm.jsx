import { useState, useEffect } from "react";
import { useAuth } from "../ContextApi/AuthContext";
import Button from "./Button";
import { useForm } from "react-hook-form";

const BlogForm = ({ onSubmit, title, content }) => {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [localTitle, setLocalTitle] = useState("");
  const [localContent, setLocalContent] = useState("");

  useEffect(() => {
    setLocalTitle(title);
    setLocalContent(content);
  }, [title, content]);

  const submitForm = (data) => {
    const blog = {
      title: data.title,
      content: data.content,
    };
    onSubmit(blog);
  };

  return (
    <div className="form">
      <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create a new blog</h2>
        <form onSubmit={handleSubmit(submitForm)}>
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
              {...register("title", { required: "Title is required" })}
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              className={`w-full mt-1 p-2 border rounded focus:outline-none focus:border-blue-500 ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
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
              {...register("content", { required: "Content is required" })}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              rows="4"
              className={`w-full mt-1 p-2 border rounded focus:outline-none focus:border-blue-500 ${
                errors.content ? "border-red-500" : ""
              }`}
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700 ${
              !token ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!token}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
