import { useAuth } from "../../Hooks/AuthContext";
import Button from "../Button/Button";

const ProfilePage = ({logout}) => {
  return (
    <div className="origin-top-left absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <Button
          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Profile
        </Button>
        <Button
          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
