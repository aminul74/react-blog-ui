// Blog.js
import { useState } from "react";
import Button from "../Button/Button";
import InputField from "../Input-Field/InputField";

const BlogItem  = ({ blog, onEdit, onDelete, onSaveEdit, isEditing }) => {
  const [editedTitle, setEditedTitle] = useState(blog.title);
  const [editedContent, setEditedContent] = useState(blog.content);

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md mb-4 transition duration-300 hover:shadow-lg">
      {isEditing ? (
        <div>
          <InputField
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full mb-2 p-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows="4"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <Button
            onClick={onSaveEdit}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700 mr-2"
          >
            Save
          </Button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
          <p className="text-lg text-gray-600 mb-2">Author: {blog.authorId}</p>
          {blog.content.length > 100 ? (
            <p className="text-lg text-gray-800">
              {isEditing ? editedContent : blog.content}
            </p>
          ) : (
            <p className="text-lg text-gray-800">{blog.content}</p>
          )}

          {blog.content.length > 100 && (
            <Button
              onClick={() => {}}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              {isEditing ? "See More" : "See Less"}
            </Button>
          )}
          <div className="absolute top-0 right-0 p-2 cursor-pointer">
            <Button
              className="text-lg text-gray-500 hover:text-gray-700"
              onClick={onEdit}
            >
              Edit
            </Button>
            <span className="mx-2">|</span>
            <Button
              className="text-lg text-red-500 hover:text-red-700"
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogItem ;
