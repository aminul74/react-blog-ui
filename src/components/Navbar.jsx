import { Link } from "react-router-dom";
import InputField from "./InputField";

const NavigationLinks = () => {
  return (
    <div className="flex items-center space-x-10">
      <Link
        to="/"
        className="items-center bg-slate-800 text-white text-xl rounded active:bg-gray-600 hover:bg-slate-700 hover:scale-105 duration-200 px-4 py-2"
      >
        Home
      </Link>

      <div className="flex items-center space-x-10">
        <Link
          to="/about"
          className="items-center bg-slate-800 text-white text-xl rounded active:bg-gray-600 hover:bg-slate-700 hover:scale-105 duration-200 px-4 py-2"
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default NavigationLinks;
