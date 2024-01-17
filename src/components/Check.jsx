import React from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const MyButtonWithToast = () => {
  const handleClick = () => {
    toast.success("Button Clicked!", {
      position: "top-right",
      autoClose: 2000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Click me!
      </button>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default MyButtonWithToast;
