import { useAuth } from "../ContextApi/AuthContext";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BlogForm from "./BlogForm";

const DropDownButton = ({ setDropDown, setIsBlogDetails, className }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <div className={className}>
      <div>
        <Button
          className="block w-full px-4 py-2 text-md hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          onClick={() => {
            {
              setDropDown && setDropDown(false);

              setDropDown && navigate(`/user/${user.id}`);
            }
            {
              setIsBlogDetails && setIsBlogDetails(false);
              setIsBlogDetails && navigate("/");
            }
          }}
        >
          {setDropDown ? "Account Setting" : null}
          {setIsBlogDetails ? "Edit" : null}
        </Button>
        <Button
          className="block w-full px-4 py-2 text-md hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          onClick={() => {
            setDropDown(false);
            navigate("/");
            logout();
          }}
        >
          {setDropDown ? "Logout" : setIsBlogDetails ? "Delete" : null}
        </Button>
      </div>
    </div>
  );
};

export default DropDownButton;
