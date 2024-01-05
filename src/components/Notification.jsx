import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Notification = ({ message, onClose }) => {
  Notification.propTypes = {
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string,
  };

  console.log("MESSAGE :", message);
  const [visible] = useState(true);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div
      className={`${
        visible ? "block" : "hidden"
      } fixed bottom-4 right-4 w-64 p-4 bg-green-500 text-white rounded-md shadow-lg`}
    >
      <p className="text-lg font-semibold mb-2" onClick={handleClose}>
        {message}
      </p>
    </div>
  );
};

export default Notification;

