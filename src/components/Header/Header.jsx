import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import AuthForm from "../UserForm/UserForm";
// useHistory

const Header = ({ isToken }) => {
  Header.propTypes = {
    isToken: PropTypes.bool.isRequired,
    // Add any other propTypes if needed
  };

  const [isDropDown, setDropDown] = useState(false);

  const handleDropDown = () => {
    setDropDown(!isDropDown);
  };

  return (
    <nav className="bg-customColor p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/">
            <img src="src/assets/logo.png" alt="Logo" className="h-14" />
          </Link>
        </div>

        <div className="flex items-center space-x-10">
          <Link
            to="/"
            className="items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
          >
            Home
          </Link>
          {!isToken ? null : (
            <Link
              to="/create-blog"
              className="items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
            >
              Create Blog
            </Link>
          )}

          <div className="Search flex">
            <input
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
        </div>

        {/* Signup */}

        {!isToken && (
          <div>
            <Link
              to="/login"
              // href="#"
              className="flex items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
            >
              Log In
            </Link>
          </div>
        )}

        {/* Profile */}

        {isToken && (
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="flex items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
              onClick={handleDropDown}
            >
              <img
                className="w-6 h-6 rounded-full"
                src="src/assets/logo.png"
                alt="Profile"
              />
              <span className="mr-2 ml-2">Aminul</span>
            </button>

            {isDropDown ? (
              <div className="origin-top-left absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
