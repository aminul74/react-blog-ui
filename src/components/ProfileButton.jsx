import { useAuth } from "../Hooks/AuthContext";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const ProfileButton = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <div className="origin-top-left absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white">
      <div>
        <Button
          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          onClick={() => navigate(`/user/${user.id}`)}
        >
          Account Setting
        </Button>
        <Button
          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          onClick={() => {
            navigate("/");
            logout();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileButton;
