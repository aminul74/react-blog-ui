const BlogList = () => {
  const blogs = [
    {
      id: 1,
      author: "John Doe",
      title: "React Basics",
      content: "This is the content of the React Basics blog.",
    },
  ];

  const handleEdit = (blogId) => {
    console.log(`Editing blog with ID ${blogId}`);
  };

  const handleDelete = (blogId) => {
    console.log(`Deleting blog with ID ${blogId}`);
  };

  return (
    <div className="container mx-auto my-5">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="relative bg-white p-6 rounded-lg shadow-md mb-4 transition duration-300 hover:shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
          <p className="text-lg text-gray-600 mb-2">Author: {blog.author}</p>
          <p className="text-lg text-gray-800">{blog.content}</p>

          <div className="absolute top-0 right-0 p-2 cursor-pointer">
            <button
              className="text-lg text-gray-500 hover:text-gray-700"
              onClick={() => handleEdit(blog.id)}
            >
              Edit
            </button>
            <span className="mx-2">|</span>
            <button
              className="text-lg text-red-500 hover:text-red-700"
              onClick={() => handleDelete(blog.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
