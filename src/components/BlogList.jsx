import { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import { useAuth } from "../Hooks/AuthContext";
import InputField from "./InputField";
import Button from "./Button";
import { Dialog, Transition } from "@headlessui/react";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import BlogForm from "./BlogForm";
const BlogList = () => {
  const { token, user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [showFullContent, setShowFullContent] = useState(false);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/blogs");

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

  //Update Blog

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

      setBlogs(updatedBlogs.data);
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
    <>
      {token ? (
        <button
          className="fixed mt-5 inline-flex items-center justify-center rounded-md bg-customColor py-4 px-6 font-dm text-lg font-large text-white shadow-lg shadow-green-200/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
          type="button"
          onClick={() => setOpen(true)}
        >
          Create Blog
        </button>
      ) : null}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <BlogForm />
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* end */}
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
                    className="text-blue-500 hover:underline focus:outline-none"
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
    </>
  );
};

export default BlogList;
