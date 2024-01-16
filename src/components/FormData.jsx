import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../ContextApi/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FormData = ({ isLogin, setIsLogin, btnLabel, signup, setSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, getUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    console.log("LOGIN", data.password);
    try {
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
      const userData = await getUser(token);
      const user = userData.data[0];
      login(token, user);
      navigate("/");
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    //   setErrorMessage(error.response.data[0].errMessage);
    }
  };

  const handleSignup = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error("Password not match");
      }

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

      const userData = await getUser(token);
      const user = userData.data[0];
      login(token, user);
      navigate("/");
    } catch (error) {
      errorHandler(error);
      // setErrorMessage(error.response.data[0].errMessage);
    }
  };

  const onSubmit = (data) => {
    console.log("first", data);
    if (signup) {
      handleSignup(data);
    } else {
      handleLogin(data);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {(isLogin || signup) && (
        <div className="mt-2">
          <InputField
            id="username"
            name="username"
            type="text"
            label="Username"
            autoComplete="username"
            required
            register={register}
          />
        </div>
      )}

      {signup && (
        <div className="mt-2">
          <InputField
            id="email"
            name="email"
            type="text"
            label="Email"
            autoComplete="email"
            required
            register={register}
          />
        </div>
      )}

      {(isLogin || signup) && (
        <div className="mt-2">
          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            required
            register={register}
          />
        </div>
      )}
      {signup && (
        <div className="mt-2">
          <InputField
            id="confirmPassword"
            name="password"
            type="password"
            label="Confirm Password"
            autoComplete="current-password"
            required
            register={register}
          />
        </div>
      )}

      <div>
        <Button
          type="submit"
          className="flex w-full justify-center rounded-md bg-cyan-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white"
        >
          {btnLabel}
        </Button>
      </div>
    </form>
  );
};

export default FormData;
