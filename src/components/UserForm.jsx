import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/AuthContext";
import InputField from "./InputField";
import Button from "./Button";

const AuthForm = () => {
  const { login, getUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isregister, setisregister] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4001/api/v1/auth/login",
        { username, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data[0];
      setLoading(false);
      const userData = await getUser(token);
      const user = userData.data[0];
      login(token, user);
      navigate("/");
    } catch (error) {
      console.error("Error login:", error);
    }
  };

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        console.error("Password and confirmation password do not match");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        "http://localhost:4001/api/v1/auth/register",
        { username, email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data[0];
      setLoading(false);
      const userData = await getUser(token);
      const user = userData.data[0];
      login(token, user);
      navigate("/");
    } catch (error) {
      console.error("Error Signup:", error);
    }
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
          <InputField
            id="username"
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
            <InputField
              id="email"
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
          <InputField
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        {isregister && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <InputField
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
        )}

        <Button
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : isregister ? "Signup" : "Login"}
        </Button>
        <div className="float-right">
          <Button
            className="md:underline"
            onClick={() => {
              setisregister(!isregister);
            }}
          >
            {isregister ? "Login here" : "Signup here"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
