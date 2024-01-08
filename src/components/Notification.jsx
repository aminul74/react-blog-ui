import React, { useEffect } from "react";

const Notification = ({ notification, className, isNotify, setNotify }) => {
  useEffect(() => {
    if (isNotify===true) {
      const timeoutId = setTimeout(() => {
        setNotify(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isNotify, setNotify]);

  return (
    <>
      {isNotify ? (
        <div className="fixed top-20 right-0 m-4 max-w-xs p-4 rounded-lg shadow dark:text-gray-400 dark:bg-green-800">
          <div className={className} role="alert">
            <div className="ms-3 text-sm font-normal">{notification}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Notification;


