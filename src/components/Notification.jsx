import { useEffect } from "react";

const Notification = ({ message, className, onClose, isVisible }) => {
  console.log("HIIIIII")
  useEffect(() => {
    let timeoutId = null;

    if (isVisible) {
      timeoutId = setTimeout(() => {
        onClose();
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [isVisible, onClose]);

  return (
    <>
      {isVisible && (
        <div className="fixed top-20 right-0 m-4 max-w-xs p-4 rounded-lg shadow dark:text-gray-400 dark:bg-green-800 z-50">
          <div className={className} role="alert">
            <div className="ms-3 text-sm font-normal">{message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
