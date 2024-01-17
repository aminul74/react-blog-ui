import React from "react";

const DisplayBlog = ({ blog }) => {
  if (Object.keys(blog).length === 0) {
    return null;
  }
  const dateObject = new Date(blog.createdAt);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="blog-details" key={blog.id}>
      <div className="w-full mx-auto space-y-4 text-center">
        <h1 className="text-2xl font-bold">{blog.title}</h1>
        <div className="text-sm">
          by
          <a href="#" target="_blank" className="underline text-violet-400">
            <p itemProp="name p-2 font-normal font-bold">
              {blog.User?.username}
            </p>
          </a>
          <div>{formattedDate}</div>
        </div>
      </div>
      <div className="pt-12 border-t border-gray-200">
        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
          <div className="flex flex-col">
            <h4 className="text-lg font-bold">{blog.title}</h4>
            <p className="first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-black first-letter:mr-3 first-letter:float-left text-black text-xl font-normal">
              {blog.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayBlog;
