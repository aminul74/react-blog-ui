function InputField({ id, className, type, value, onChange, placeholder }) {
  return (
    <div className="Input">
      <input
        id={id}
        className={`w-full px-3 py-2 border rounded ${className}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
