import { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import { useAuth } from "../Hooks/AuthContext";
import Button from "./Button";
import { Dialog, Transition } from "@headlessui/react";
import BlogForm from "./BlogForm";
import BlogCard from "./BlogCard";
import { useBlogContext } from "../Hooks/BlogContext";
import Pagination from "./Pagination";

const BlogList = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const { blogList, setBlogList } = useBlogContext();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/blogs");

        // console.log("yuyuyuyuyuyuyuyuyuyu", response.data);
        setLoading(false);
        setBlogList(response.data);
        // setBlogs(response.data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, [page, size]);

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const decrementPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  if (loading) {
    return <h1 className="text-center mt-5 text-white">Loading...</h1>;
  }

  return (
    <div>
      {token && (
        <Button
          className="fixed z-10 left-0 top-24 inline-flex items-center justify-center rounded-md bg-customColor py-4 px-6 font-dm text-lg font-large text-white  transition-transform duration-200 ease-in-out hover:scale-[1.02]"
          type="button"
          onClick={() => setOpen(true)}
        >
          Create Blog
        </Button>
      )}
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

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
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

      <div className="container mx-auto my-5 h-full">
        {blogList.map((blog) => (
          <BlogCard
            blog={blog}
            setBlogList={setBlogList}
            key={blog.id}
            loading={loading}
          />
        ))}
      </div>
      <h1>{page}</h1>
      <div className="item-center">
        <Pagination
          incrementPage={incrementPage}
          decrementPage={decrementPage}
        />
      </div>
    </div>
  );
};

export default BlogList;
