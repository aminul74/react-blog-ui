import React from "react";
import { Link, useNavigate } from "react-router-dom";

function BlogCard({ blog }) {
  const dateObject = new Date(blog.createdAt);
  const navigate = useNavigate();
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const LimitContent = ({ content }) => {
    return (
      <div className="mb-6 text-xl font-normal">
        {content && content.length > 15
          ? content.split(" ").slice(0, 15).join(" ") + "..."
          : content}
      </div>
    );
  };

  const handleReadMore = () => {
    navigate(`/blog/${blog.id}`);
  };

  return (
    <div className="max-w-2xl sm:max-w-2xl md:max-w-2xl lg:max-w-4xl bg-white border border-gray-200 rounded-lg shadow text-black p-12 hover:bg-gray-100 transform hover:scale-105 duration-200">
      <div className="app">
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src="src/assets/userProfile.png"
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-lg">
            <p className="leading-none">{blog.User.username}</p>
            <p>{formattedDate}</p>
          </div>
        </div>
        <p className="mb-6 text-2xl font-normal">{blog.title}</p>
        <LimitContent content={blog.content} />
        <div className="flex justify-end items-center">
          <Link
            to={`/blog/${blog.id}`}
            className="inline-flex px-4 py-2 text-md font-medium text-center hover:bg-gray-300"
            onClick={handleReadMore}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
