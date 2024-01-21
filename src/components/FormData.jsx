import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../ContextApi/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../utility/userAction";
import userValidation from "../utility/UserSchema";

const FormData = ({ isLogin, btnLabel, signup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidation),
  });
  const { login, getUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const { mutate: createdUser } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data) => registerUser(data),
    onSuccess: async (responseData) => {
      const { token } = responseData;
      const userInfo = await getUser(token);
      const user = userInfo.data[0];
      login(token, user);
      navigate("/");
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const handleSignup = (data) => {
    createdUser(data);
  };

  const { mutate: loggedInUser } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => loginUser(data),
    onSuccess: async (responseData) => {
      const { token } = responseData;
      const userInfo = await getUser(token);
      const user = userInfo.data[0];
      login(token, user);
      navigate("/");
    },
    onError: (error) => {
      console.log("MUTATE :", error);
      errorHandler(error);
    },
  });

  const handleLogin = (data) => {
    loggedInUser(data);
  };

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

  const onSubmit = (data) => {
    if (signup) {
      if (data.password !== data.confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }
      handleSignup(data);
    } else {
      handleLogin(data);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-red-500">{errorMessage}</p>
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

          <p className="text-red-500">{errors.username?.message}</p>
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
          <p className="text-red-500">{errors.email?.message}</p>
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

          <p className="text-red-500">{errors.password?.message}</p>
        </div>
      )}
      {signup && (
        <div className="mt-2">
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            autoComplete="current-password"
            required
            register={register}
          />

          <p className="text-red-500">{errors.confirmPassword?.message}</p>
        </div>
      )}

      <div>
        <Button
          type="submit"
          className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-4 font-semibold leading-6 text-white text-md hover:scale-105 duration-200"
        >
          {btnLabel}
        </Button>
      </div>
    </form>
  );
};

export default FormData;
