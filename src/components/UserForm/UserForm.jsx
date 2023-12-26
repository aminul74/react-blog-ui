import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AuthForm = ({ handleButtonVisibility }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isregister, setisregister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post(
        "http://localhost:4001/api/v1/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const { token } = response.data[0];
        console.log(token);
        setisregister(!isregister);
        handleButtonVisibility();
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  const handleSignup = () => {
    axios
      .post(
        "http://localhost:4001/api/v1/auth/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const { token } = response.data[0];
        console.log(token);
        setisregister(!isregister);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during signup:", error);
      });
  };

  const handleSubmit = () => {
    if (isregister) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">
          {isregister ? "Signup" : "Login"}
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        {isregister && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
          type="submit"
          onClick={handleSubmit}
        >
          {isregister ? "Signup" : "Login"}
        </button>
        <div className="float-right">
          <button
            className="md:underline"
            onClick={() => {
              setisregister(!isregister);
            }}
          >
            {isregister ? "Login here" : "Signup here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
