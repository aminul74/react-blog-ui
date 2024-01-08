import { useEffect, useState, useRef, Fragment, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../ContextApi/AuthContext";
import Button from "../components/Button";
import { Dialog, Transition } from "@headlessui/react";
import BlogForm from "../components/BlogForm";
import BlogCard from "../components/BlogCard";
import { useBlogContext } from "../ContextApi/BlogContext";
import Pagination from "../components/Pagination";
import Notification from "../components/Notification";
import HeroSection from "../components/HeroSection";
import Modal from "../components/Modal";

const BlogsPage = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isNotify, setNotify] = useState(false);
  const [notification, setNotification] = useState("");
  const cancelButtonRef = useRef(null);
  const { blogList, setBlogList } = useBlogContext();
  const onCreateBlog = useCallback((message) => {
    setOpenModal(false);
    setNotification(message);
    setNotify(true);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/blogs");
        setLoading(false);
        setBlogList(response.data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);

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
    <div className="relative">
      <Notification
        notification={notification}
        isNotify={isNotify}
        setNotify={setNotify}
      />

      {token && (
        <div className="border-1F2937">
          <Button
            type="button"
            className="fixed z-10 left-2 top-24 bg-slate-800 text-white text-lg font-bold py-2 px-4 rounded hover:bg-slate-700 mt-5 hover:scale-105 duration-200"
            onClick={() => setOpenModal(true)}
          >
            <svg
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="800px"
              height="800px"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              className="h-6 w-8 inline-block mr-2"
              fill="#A78BFA"
            >
              <style type="text/css" />
              <g>
                <path
                  className="st0"
                  d="M421.073,221.719c-0.578,11.719-9.469,26.188-23.797,40.094v183.25c-0.016,4.719-1.875,8.719-5.016,11.844 c-3.156,3.063-7.25,4.875-12.063,4.906H81.558c-4.781-0.031-8.891-1.844-12.047-4.906c-3.141-3.125-4.984-7.125-5-11.844V152.219 c0.016-4.703,1.859-8.719,5-11.844c3.156-3.063,7.266-4.875,12.047-4.906h158.609c12.828-16.844,27.781-34.094,44.719-49.906 c0.078-0.094,0.141-0.188,0.219-0.281H81.558c-18.75-0.016-35.984,7.531-48.25,19.594c-12.328,12.063-20.016,28.938-20,47.344 v292.844c-0.016,18.406,7.672,35.313,20,47.344C45.573,504.469,62.808,512,81.558,512h298.641c18.781,0,36.016-7.531,48.281-19.594 c12.297-12.031,20-28.938,19.984-47.344V203.469c0,0-0.125-0.156-0.328-0.313C440.37,209.813,431.323,216.156,421.073,221.719z"
                />
                <path
                  className="st0"
                  d="M498.058,0c0,0-15.688,23.438-118.156,58.109C275.417,93.469,211.104,237.313,211.104,237.313 c-15.484,29.469-76.688,151.906-76.688,151.906c-16.859,31.625,14.031,50.313,32.156,17.656 c34.734-62.688,57.156-119.969,109.969-121.594c77.047-2.375,129.734-69.656,113.156-66.531c-21.813,9.5-69.906,0.719-41.578-3.656 c68-5.453,109.906-56.563,96.25-60.031c-24.109,9.281-46.594,0.469-51-2.188C513.386,138.281,498.058,0,498.058,0z"
                />
              </g>
            </svg>
            Create Blog
          </Button>
        </div>
      )}

      <div>
        <Modal onClose={() => setOpenModal(false)} open={openModal}>
          <BlogForm onCreateBlog={onCreateBlog} />
        </Modal>
      </div>
      {/* <Transition.Root show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenModal}
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
                    <BlogForm onCreateBlog={onCreateBlog} />
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpenModal(false)}
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
      </Transition.Root> */}
      {/* end */}

      <div>
        <HeroSection />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-6 max-w-screen-xl mx-auto mt-5">
        {blogList.map((blog) => (
          <BlogCard blog={blog} setBlogList={setBlogList} key={blog.id} />
        ))}
      </div>
      <div className="item-center sticky bottom-0 z-50">
        <Pagination />
      </div>
    </div>
  );
};

export default BlogsPage;
