import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Button from "../components/Button";
const UserFormPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);

  const switchForm = () => {
    setIsLogin(false);
    setIsSignup(true);
  };
  const backToLogin = () => {
    setIsSignup(false);
    setIsLogin(true);
  };

  return (
    <div className="bg-white h-screen">
      <div>{isLogin ? <LoginForm /> : <SignupForm />}</div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mt-5 text-center text-md text-black">
          {isLogin ? "If you are not registered?" : "Already have an account?"}
          <br />
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            onClick={isLogin ? switchForm : backToLogin}
          >
            {isLogin ? "Signup here" : "Login here"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserFormPage;
