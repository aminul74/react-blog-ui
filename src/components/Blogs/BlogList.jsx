import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Hooks/AuthContext";
import Button from "../Button/Button";
import InputField from "../Input-Field/InputField";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlogId, setEditingBlogId] = useState(true);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [showFullContent, setShowFullContent] = useState(false);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/blogs", {
          params: {
            title: "",
            content: "",
            authorId: "",
          },
        });

        setLoading(false);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (blogId) => {
    const blogToEdit = blogs.find((blog) => blog.id === blogId);

    setEditingBlogId(blogId);
    setEditedTitle(blogToEdit.title);
    setEditedContent(blogToEdit.content);
  };

  // Update Blog

  const handleSaveEdit = async () => {
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

      // Get Updated Blog

      const updatedBlogs = await axios.get(
        "http://localhost:4001/api/v1/blogs",
        {
          params: {
            title: "",
            content: "",
            authorId: "",
          },
        }
      );

      setBlogs(updatedBlogs.data);
      setEditingBlogId(null);
    } catch (error) {
      console.error("Error editing the blog:", error);
    }
  };

  // Delete Blog

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:4001/api/v1/blogs/${blogId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-5 text-white">Loading...</h2>;
  }

  const truncateContent = (content) => {
    const maxLength = 100;
    return content.length > maxLength
      ? `${content.substring(0, maxLength)}...`
      : content;
  };

  return (
    <div className="container mx-auto my-5">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="relative bg-white p-6 rounded-lg shadow-md mb-4 transition duration-300 hover:shadow-lg"
        >
          {editingBlogId === blog.id ? (
            <div>
              <InputField
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full mb-2 p-2 border rounded focus:border-blue-500"
              />
              <InputField
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows="4"
                className="w-full p-2 border rounded focus:border-blue-500"
              />
              <Button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mr-2"
              >
                Save
              </Button>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="text-lg text-gray-600 mb-2">
                Author: {blog.authorId}
              </p>
              {showFullContent ? (
                <p className="text-lg text-gray-800">{blog.content}</p>
              ) : (
                <p className="text-lg text-gray-800">
                  {truncateContent(blog.content)}
                </p>
              )}

              {blog.content.length > 100 && (
                <Button
                  onClick={() => setShowFullContent(!showFullContent)}
                  className="text-blue-500 hover:underline"
                >
                  {showFullContent ? "See Less" : "See More"}
                </Button>
              )}
              {user?.id === blog.authorId && (
                <div className="absolute top-0 right-0 p-2 cursor-pointer">
                  <Button
                    className="text-lg text-gray-500 hover:text-gray-700"
                    onClick={() => handleEdit(blog.id)}
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
      ))}
    </div>
  );
};

export default BlogList;
