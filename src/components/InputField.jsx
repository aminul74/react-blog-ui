import React from "react";
const InputField = ({
  label,
  id,
  type,
  autoComplete,
  required,
  className,
  register,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-md font-medium text-black">
        {label}
      </label>
      <div className="mt-2">
        <input
          {...register(id)}
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          required={required}
          className={`block w-full rounded-md border-0 py-1.5 pl-3 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black sm:text-sm sm:leading-6 ${className}`}
        />
      </div>
    </div>
  );
};

export default InputField;
