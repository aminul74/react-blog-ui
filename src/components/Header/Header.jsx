import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../Hooks/AuthContext";
import Profile from "../Profile/Profile";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  Header.propTypes = {
    isToken: PropTypes.bool.isRequired,
  };

  const { token, logout, user } = useAuth();
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

        <Navbar isLoggedIn={token} />

        {!token && (
          <div>
            <Link
              to="/login"
              className="flex items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
            >
              Log In
            </Link>
          </div>
        )}

        {token && (
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="flex items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
              onClick={handleDropDown}
            >
              <img
                className="w-6 h-6 rounded-full"
                src="src/assets/user.png"
                alt="Profile"
              />
              <span className="mr-2 ml-2">{user.username}</span>
            </button>

            {isDropDown ? <Profile logout={logout} /> : null}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
