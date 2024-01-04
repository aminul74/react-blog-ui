/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import InputField from "./InputField";
import Button from "./Button";
import { useAuth } from "../Hooks/AuthContext";
import { useNavigate } from "react-router";
// import { useBlogContext } from "../Hooks/BlogContext";
// import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";

function BlogCard({ blog, setBlogList }) {
  // const [loading, setLoading] = useState(true);
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  // const { blogList, setBlogList } = useBlogContext();
  // const history = useHistory();

  const handleEdit = () => {
    // const blogToEdit = blogs.find((blog) => blog.id === blogId);

    setEditingBlogId(blog.id);
    setEditedTitle(blog.title);
    setEditedContent(blog.content);
  };

  const handleSaveEdit = async (editingBlogId) => {
    try {
      await axios.put(
        `http://localhost:4001/api/v1/blogs/${editingBlogId}`,
        {
          title: editedTitle,
          content: editedContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      //Get Updated Blog

      const updatedBlogs = await axios.get(
        "http://localhost:4001/api/v1/blogs"
      );

      setBlogList(updatedBlogs.data);
      setEditingBlogId(true);
    } catch (error) {
      console.error("Error editing the blog:", error);
    }
  };

  //Delete Blog

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:4001/api/v1/blogs/${blogId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      setBlogList((prevBlogs) =>
        prevBlogs.filter((blog) => blog.id !== blogId)
      );
      navigate("/");
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
  };

  // if (loading) {
  //   return <h2 className="text-center mt-5 text-white">Loading...</h2>;
  // }

  const truncateContent = (content) => {
    const maxLength = 100;
    return content.length > maxLength
      ? `${content.substring(0, maxLength)}...`
      : content;
  };
  return (
    <div className="w-full">
      <div className="container mx-auto my-5 h-full sm:w-full md:w-9/12">
        <div className="relative bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg">
          {editingBlogId === blog.id ? (
            <div>
              <div className="inline-flex">
                <Button
                  className=" hover:bg-blue-500 text-gray-800 font-bold py-2 px-4 rounded-l"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Prev
                </Button>
                <Button className=" hover:bg-blue-500 text-gray-800 font-bold py-2 px-4 rounded-r">
                  Next
                </Button>
              </div>
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
                onClick={() => {
                  handleSaveEdit(blog.id);
                }}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700 mr-2"
              >
                Save
              </Button>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="text-lg text-gray-600 mb-2">
                Author: {user?.username}
              </p>
              {showFullContent ? (
                <p className="text-lg text-gray-800">{blog.content}</p>
              ) : (
                <p className="text-lg text-gray-800">
                  {truncateContent(blog.content)}
                </p>
              )}

              {blog.content.length > 100 && (
                <div className="mt-2">
                  <Button
                    onClick={() => setShowFullContent(!showFullContent)}
                    className="text-blue-500 hover:underline focus:outline-none"
                  >
                    {showFullContent ? "See Less" : "See More"}
                  </Button>
                </div>
              )}

              {user?.id === blog.authorId && (
                <div className="absolute top-0 right-0 p-2 cursor-pointer">
                  <Button
                    className="text-lg text-gray-500 hover:text-gray-700"
                    onClick={() => handleEdit()}
                  >
                    Edit
                  </Button>
                  <span className="mx-2">|</span>
                  <Button
                    className="text-lg text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
