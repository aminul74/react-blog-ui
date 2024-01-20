import React from "react";
import Button from "./Button";

const DropDownButton = ({ onClick, labels, handleButtonClick }) => {
  return (
    <div>
      <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white text-black hover:scale-105 duration-200 ">
        {labels.map((label, index) => (
          <Button
            data-testid="clickeddrpdwn"
            key={index}
            onClick={() => handleButtonClick(label)}
            className="block w-full px-4 py-2 text-md hover:bg-gray-100 hover:text-gray-900"
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DropDownButton;
