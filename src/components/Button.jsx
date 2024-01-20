import React from "react";
const Button = ({ onClick, disabled, loading, children, type, className }) => {
  return (
    <button
      data-testid="Click me"
      className={`${className} ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Processing..." : children}
    </button>
  );
};

export default Button;
