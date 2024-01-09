/* eslint-disable react/prop-types */
import React from "react";
import Button from "./Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import BlogDetails from "./BlogDetails";

function BlogCard({ blog, setBlogList }) {
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
        {content.length > 15
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
            <p className="leading-none">1</p>
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

// <div className="max-w-lg w-full lg:max-w-full lg:flex place-self-center">
//   <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
//     <div className="flex items-center">
//       <img
//         className="w-10 h-10 rounded-full mr-4"
//         src="src/assets/userProfile.png"
//         alt="Avatar of Jonathan Reinink"
//       />
//       <div className="text-sm">
//         <p className="text-gray-900 leading-none">Jonathan Reinink</p>
//         <p className="text-gray-600">Aug 18</p>
//       </div>
//     </div>

//       <div className="text-gray-900 font-bold text-xl mb-2">
//         Can coffee make you a better developer?
//       </div>
//     <div className="mb-8">
//       <p className="text-gray-700 text-base">
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//         Voluptatibus quia, nulla! Maiores et perferendis eaque,
//         exercitationem praesentium nihil.
//       </p>
//     </div>
//   </div>
// </div>

// import { useState } from "react";
// import axios from "axios";
// import InputField from "./InputField";
// import Button from "./Button";
// import { useAuth } from "../ContextApi/AuthContext";
// import { useNavigate } from "react-router";

// function BlogCard({ blog, setBlogList }) {
//   const { token, user } = useAuth();
//   const navigate = useNavigate();
//   const [editingBlogId, setEditingBlogId] = useState(null);
//   const [showFullContent, setShowFullContent] = useState(false);
//   const [editedTitle, setEditedTitle] = useState("");
//   const [editedContent, setEditedContent] = useState("");

//   const handleEdit = () => {
//     setEditingBlogId(blog.id);
//     setEditedTitle(blog.title);
//     setEditedContent(blog.content);
//   };

//   const handleSaveEdit = async (editingBlogId) => {
//     try {
//       await axios.put(
//         `http://localhost:4001/api/v1/blogs/${editingBlogId}`,
//         {
//           title: editedTitle,
//           content: editedContent,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       //Get Updated Blog

//       const updatedBlogs = await axios.get(
//         "http://localhost:4001/api/v1/blogs"
//       );

//       setBlogList(updatedBlogs.data);
//       setEditingBlogId(true);
//     } catch (error) {
//       console.error("Error editing the blog:", error);
//     }
//   };

//   //Delete Blog

//   const handleDelete = async (blogId) => {
//     try {
//       await axios.delete(`http://localhost:4001/api/v1/blogs/${blogId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//         },
//       });

//       setBlogList((prevBlogs) =>
//         prevBlogs.filter((blog) => blog.id !== blogId)
//       );
//       navigate("/");
//     } catch (error) {
//       console.error("Error deleting the blog:", error);
//     }
//   };

//   const handleContentLength = (content) => {
//     const maxLength = 100;
//     return content.length > maxLength
//       ? `${content.substring(0, maxLength)}...`
//       : content;
//   };
//   return (
//     <div className="w-full">
//       <div className="container mx-auto my-5 h-full sm:w-full md:w-9/12">
//         <div className="relative bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg">
//           {editingBlogId === blog.id ? (
//             <div>
//               <div className="inline-flex">
//                 <Button
//                   className=" hover:bg-blue-500 text-gray-800 font-bold py-2 px-4 rounded-l"
//                   onClick={() => {
//                     window.location.reload();
//                   }}
//                 >
//                   Prev
//                 </Button>
//                 <Button className=" hover:bg-blue-500 text-gray-800 font-bold py-2 px-4 rounded-r">
//                   Next
//                 </Button>
//               </div>

//               <InputField
//                 type="text"
//                 value={editedTitle}
//                 onChange={(e) => setEditedTitle(e.target.value)}
//                 className="w-full mb-2 p-2 border rounded focus:outline-none focus:border-blue-500"
//               />
//               <textarea
//                 value={editedContent}
//                 onChange={(e) => setEditedContent(e.target.value)}
//                 rows="4"
//                 className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
//               />
//               <Button
//                 onClick={() => {
//                   handleSaveEdit(blog.id);
//                 }}
//                 className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700 mr-2"
//               >
//                 Save
//               </Button>
//             </div>
//           ) : (
//             <div>
//               <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
//               <p className="text-lg text-gray-600 mb-2">
//                 Author: {blog?.User?.username}
//               </p>
//               {showFullContent ? (
//                 <p className="text-lg text-gray-800">{blog.content}</p>
//               ) : (
//                 <p className="text-lg text-gray-800">
//                   {handleContentLength(blog.content)}
//                 </p>
//               )}

//               {blog.content.length > 100 && (
//                 <div className="mt-2">
//                   <Button
//                     onClick={() => setShowFullContent(!showFullContent)}
//                     className="text-blue-500 hover:underline focus:outline-none"
//                   >
//                     {showFullContent ? "See Less" : "See More"}
//                   </Button>
//                 </div>
//               )}

//               {user?.id === blog.authorId && (
//                 <div className="absolute top-0 right-0 p-2 cursor-pointer">
//                   <Button
//                     className="text-lg text-gray-500 hover:text-gray-700"
//                     onClick={() => handleEdit()}
//                   >
//                     Edit
//                   </Button>
//                   <span className="mx-2">|</span>
//                   <Button
//                     className="text-lg text-red-500 hover:text-red-700"
//                     onClick={() => handleDelete(blog.id)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogCard;
