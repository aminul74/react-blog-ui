import { useState } from "react";
import FormData from "./FormData";
const SignupForm = () => {
  const [isSignup, setIsSignup] = useState(true);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold text-black">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormData
          btnLabel={"Sign up"}
          signup={isSignup}
          setSignup={setIsSignup}
        />
      </div>
    </div>
  );
};

export default SignupForm;
