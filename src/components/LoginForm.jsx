import React from "react";
import { useState } from "react";
import FormData from "./FormData";
const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div
      data-testid="signIn"
      className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold text-black">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-lg text-black">
        <FormData
          btnLabel={"Sing in"}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      </div>
    </div>
  );
};

export default LoginForm;
