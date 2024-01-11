import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../ContextApi/AuthContext";
import Button from "../components/Button";
import { useForm } from "react-hook-form";

const UserForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { login, getUser } = useAuth();
  const [isregister, setisregister] = useState(false);
  const [isLogin, setIslogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  // console.log("FRONTEND", errorMessage);

  const errorHandler = (error) => {
    setErrorMessage(error.response.data[0].errMessage);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorHandler]);

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4001/api/v1/auth/login",
        data,
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
      setLoading(false);
      setErrorMessage(error.response.data[0].errMessage);
      // console.error("XXXXXXX", );
    }
  };

  const handleSignup = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error("Password not match");
      }

      setLoading(true);
      const response = await axios.post(
        "http://localhost:4001/api/v1/auth/register",
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
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
      errorHandler(error);
      // setErrorMessage(error.response.data[0].errMessage);
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    if (isregister) {
      handleSignup(data);
    } else {
      handleLogin(data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-5">
      <div className="bg-white p-8 rounded shadow-md w-96 h-screen">
        <h2 className="text-2xl font-semibold mb-6">
          {isLogin ? "Login" : "Signup"}
        </h2>
        <p className="text-red-500 text-center">{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {(isLogin || isregister) && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                {...register("username", {
                  required: "Username is required",
                })}
                id="username"
                type="text"
                className="w-full px-3 py-2 border border-gray-500 rounded-md"
              />
              <p className="text-red-400">{errors.username?.message}</p>
            </div>
          )}

          {isregister && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                type="text"
                className="w-full px-3 py-2 border border-gray-500 rounded-md"
              />
              <p className="text-red-400">{errors.email?.message}</p>
            </div>
          )}

          {(isLogin || isregister) && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-500 rounded-md"
              />
              <p className="text-red-400">{errors.password?.message}</p>
            </div>
          )}

          {isregister && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Confirmation password is required",
                })}
                id="confirmPassword"
                type="password"
                className="w-full px-3 py-2 border border-gray-500 rounded-md"
              />
              <p className="text-red-400">{errors.confirmPassword?.message}</p>
            </div>
          )}

          <Button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:scale-105 duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : isregister ? "Signup" : "Login"}
          </Button>
          <div className="float-right">
            <Button
              className="md:underline"
              onClick={() => {
                setIslogin(false);
                setisregister(true);
              }}
            >
              {isLogin ? "Signup here" : null}
            </Button>
          </div>
          {isregister && (
            <div className="mt-4">
              <Button
                className="md:underline text-blue-500"
                onClick={() => {
                  setisregister(false);
                  setIslogin(true);
                }}
              >
                Back to Login
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserForm;
