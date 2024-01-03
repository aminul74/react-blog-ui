import { Link } from "react-router-dom";
import InputField from "./InputField";
// import ProfilePage from "./ProfileButton";
import Button from "./Button";
// eslint-disable-next-line react/prop-types
const NavigationLinks = ({ isLoggedIn }) => {
  return (
    <div className="flex items-center space-x-10">
      <Link
        to="/"
        className="items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
      >
        Home
      </Link>
      {isLoggedIn ? (
        <Link
          to="/create-blog"
          className="items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
        >
          Create Blog
        </Link>
      ) : null}

      <div className="Search flex">
        <InputField
          id="search"
          type="text"
          className="bg-gray-800 text-white rounded-l-full py-2 px-4 focus:outline-none"
          placeholder="Search..."
        />
        <a
          href="#"
          className="bg-gray-800 text-white rounded-r-full px-4 py-2 hover:bg-gray-600"
        >
          Search
        </a>
      </div>
      <Button></Button>
      {/* {isLoggedIn && (
        <div>
          <ProfilePage />
        </div>
      )} */}
    </div>
  );
};

export default NavigationLinks;
