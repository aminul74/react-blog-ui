const Button = ({ onClick, disabled, loading, children, type, className }) => {
  return (
    <button
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
