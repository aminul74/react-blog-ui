import { useState } from "react";

const AuthForm = ({ handleButtonVisibility }) => {
  const [isregistered, setIsregistered] = useState(true);

  const handleSignup = () => {
    setIsregistered(!isregistered);
  };

  const handleLogin = () => {
    setIsregistered(!isregistered);
  };
  return (
    <div className="flex items-center justify-center mt-5">
      {isregistered && (
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              type="text"
              id="username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
            />
          </div>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
            type="submit"
            onClick={handleButtonVisibility}
          >
            Login
          </button>
          <div className="float-right">
            <button className="md:underline" onClick={handleSignup}>
              Or Signup here
            </button>
          </div>
        </div>
      )}

      {!isregistered && (
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-6">Signup</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              type="text"
              id="username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              type="text"
              id="email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
            />
          </div>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
            type="submit"
          >
            Signup
          </button>
          <div className="float-right">
            <button className="md:underline" onClick={handleLogin}>
              Or Login here
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
