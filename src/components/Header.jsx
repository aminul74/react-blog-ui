import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../ContextApi/AuthContext";
import DropDownButton from "./DropDownButton";
import Navbar from "./Navbar";
import Button from "./Button";
import ConfirmAlert from "./ConfirmAlert";

const Header = () => {
  const { token, user, logout } = useAuth();
  const [isDropDown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const handleDropDown = () => {
    setDropDown(!isDropDown);
  };

  const onLogoutButton = () => {
    setShowAlert(true);
    setDropDown(false);
  };

  const handleButtonClick = (label) => {
    if (label === "Account") {
      navigate(`/user/${user.id}`);
    } else if (label === "Logout") {
      onLogoutButton();
      // logout();
    }
  };

  const onLogoutClicked = () => {
    logout();
    setShowAlert(false);
    navigate("/login");
  };

  const onCancelClicked = () => {
    setShowAlert(false);
  };

  const handleOutsideClick = (event) => {
    if (
      isDropDown &&
      !event.target.closest(".profile-button") &&
      !event.target.closest(".profile-dropdown")
    ) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropDown]);

  return (
    <nav className="bg-customColor p-4 sticky top-0 z-50 drop-shadow-xl">
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
              className="flex items-center bg-gray-800 text-white text-xl rounded-full active:bg-gray-600 px-4 py-2"
            >
              Log In
            </Link>
          </div>
        )}

        {token && (
          <div className="relative inline-block text-left">
            <Button
              type="button"
              className="flex items-center bg-slate-800 text-white rounded active:bg-gray-600 hover:bg-slate-700 hover:scale-105 duration-200 px-4 py-2 profile-button"
              onClick={handleDropDown}
            >
              <img
                className="w-6 h-6 rounded-full"
                src="src/assets/user.png"
                alt="Profile"
              />
              <span className="mr-2 ml-2 text-xl">{user.username}</span>
            </Button>

            {isDropDown && (
              <div className="profile-dropdown ">
                <DropDownButton
                  labels={["Account", "Logout"]}
                  handleButtonClick={handleButtonClick}
                />
              </div>
            )}

            {showAlert && (
              <ConfirmAlert
                onCancel={onCancelClicked}
                onConfirm={onLogoutClicked}
                titleMsg={"Logout"}
                label={"Confirm Logout"}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
