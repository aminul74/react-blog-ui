import { useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../ContextApi/AuthContext";
import BlogForm from "../components/BlogForm";
import BlogCard from "../components/BlogCard";
import { useBlogContext } from "../ContextApi/BlogContext";
import Notification from "../components/Notification";
import HeroSection from "../components/HeroSection";
import Modal from "../components/Modal";
import ReactPaginate from "react-paginate";
import CreateBlogButton from "../components/CreateBlogButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
const BlogsPage = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [toastPopUp, setToastPopUp] = useState(false);
  const { pageNumber, setPageNumber } = useBlogContext();
  const nextPage = pageNumber + 1;
  const blogsPerPage = 6;

  const messageSetAs = useCallback((message) => {
    setOpenModal(false);
    setMessage(message);
    setToastPopUp(true);
  });

  const onMessageHide = () => {
    setToastPopUp(false);
  };

  const changePage = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["blogs", nextPage, blogsPerPage],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/v1/blogs?page=${nextPage}&size=${blogsPerPage}`
        );
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
  });

  const blogs = data ? data[0] : [];
  const totalCount = data ? data[1] : [];

  const { mutate, isPending, isError, Error } = useMutation({
    mutationFn: async (blog) => {
      return axios.post("http://localhost:4001/api/v1/blogs/create", blog, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs", nextPage, blogsPerPage],
        exact: true,
      });
      messageSetAs("Blog created successfully!");
    },
  });

  const handleCreateBlog = (blog) => {
    mutate(blog);
  };

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
        <BeatLoader color="#ffffff" loading={isLoading} />
      </div>
    );
  }

  return (
    <div className="relative">
      {toastPopUp && (
        <div>
          <Notification
            message={message}
            onClose={onMessageHide}
            isVisible={setToastPopUp}
          />
        </div>
      )}

      {token && <CreateBlogButton onClick={() => setOpenModal(true)} />}

      <div>
        <Modal onClose={() => setOpenModal(false)} open={openModal}>
          <BlogForm
            onSubmit={handleCreateBlog}
            title=""
            content=""
            isPending={isPending}
          />
        </Modal>
      </div>
      <div>
        <HeroSection />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-6 max-w-screen-xl mx-auto mt-5">
        {blogs && blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>
      <div className="flex items-center justify-center mt-16">
        <ReactPaginate
          forcePage={pageNumber}
          pageCount={Math.ceil(totalCount / 6)}
          onPageChange={changePage}
          containerClassName={
            "flex justify-center paginationBttns items-center text-white"
          }
          pageClassName="px-2 m-6"
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={" bg-white text-black rounded-full"}
          previousLabel={pageNumber === 0 ? null : "Previous"}
        />
      </div>
    </div>
  );
};

export default BlogsPage;

// import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { useAuth } from "../ContextApi/AuthContext";
// import Button from "../components/Button";
// import BlogForm from "../components/BlogForm";
// import BlogCard from "../components/BlogCard";
// import { useBlogContext } from "../ContextApi/BlogContext";
// import Notification from "../components/Notification";
// import HeroSection from "../components/HeroSection";
// import Modal from "../components/Modal";
// import ReactPaginate from "react-paginate";
// import CreateBlogButton from "../components/CreateBlogButton";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// const BlogsPage = () => {
//   const { token } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageVisibility, setMessageVisibility] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const queryClient = useQueryClient();

//   const {
//     blogList,
//     setBlogList,
//     pageNumber,
//     setPageNumber,
//     totalCount,
//     setTotalCount,
//   } = useBlogContext();
//   const blogsPerPage = 6;
//   // const pageCount = Math.ceil(totalCount / blogsPerPage);

//   const messageSetAs = useCallback((message) => {
//     setOpenModal(false);
//     setMessage(message);
//     setMessageVisibility(true);
//   });

//   const onMessageHide = () => {
//     setMessageVisibility(false);
//   };

//   const changePage = (data) => {
//     const selectedPage = data.selected;
//     console.log("INside", typeof selected);

//     setPageNumber(selectedPage);
//   };

//   const apiEndpoint = `http://localhost:4001/api/v1/blogs?page=${
//     pageNumber + 1
//   }&size=${blogsPerPage}`;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(apiEndpoint);
//         setBlogList(response.data[0]);
//         setTotalCount(response.data[1]);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         // console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [pageNumber, apiEndpoint]);

//   const handleCreateBlog = async (blog) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:4001/api/v1/blogs/create",
//         blog,
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setBlogList((prevBlogList) => [...prevBlogList, ...response.data]);
//       messageSetAs("Blog created successfully!");
//       setErrorMessage("");
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   if (loading) {
//     return <h1 className="text-center mt-5 text-white">Loading...</h1>;
//   }

//   return (
//     <div className="relative">
//       {messageVisibility && (
//         <div>
//           <Notification
//             message={message}
//             onClose={onMessageHide}
//             isVisible={messageVisibility}
//           />
//         </div>
//       )}

//       {token && <CreateBlogButton onClick={() => setOpenModal(true)} />}

//       <div>
//         <Modal onClose={() => setOpenModal(false)} open={openModal}>
//           <BlogForm onSubmit={handleCreateBlog} title="" content="" />
//         </Modal>
//       </div>
//       <div>
//         <HeroSection />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-6 max-w-screen-xl mx-auto mt-5">
//         {blogList.map((blog) => (
//           <BlogCard key={blog.id} blog={blog} setBlogList={setBlogList} />
//         ))}
//       </div>
//       <div className="flex items-center justify-center mt-16">
//         <ReactPaginate
//           forcePage={pageNumber}
//           pageCount={Math.ceil(totalCount / 6)}
//           onPageChange={changePage}
//           containerClassName={
//             "flex justify-center paginationBttns items-center text-white"
//           }
//           pageClassName="px-2 m-6"
//           previousLinkClassName={"previousBttn"}
//           nextLinkClassName={"nextBttn"}
//           disabledClassName={"paginationDisabled"}
//           activeClassName={" bg-white text-black rounded-full"}
//           previousLabel={pageNumber === 0 ? null : "Previous"}
//         />
//       </div>
//     </div>
//   );
// };

// export default BlogsPage;
