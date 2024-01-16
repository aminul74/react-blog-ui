// function InputField({ id, className, type, value, onChange, placeholder }) {
//   return (
//     <div className="Input">
//       <input
//         id={id}
//         className={`w-full px-3 py-2 border rounded ${className}`}
//         type={type}
//         value={value}
//         placeholder={placeholder}
//         onChange={onChange}
//       />
//     </div>
//   );
// }

// export default InputField;

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
      <label htmlFor={id} className="block text-sm font-medium text-white">
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
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white sm:text-sm sm:leading-6 ${className}`}
        />
      </div>
    </div>
  );
};

export default InputField;
