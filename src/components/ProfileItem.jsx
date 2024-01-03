import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { useAuth } from "../Hooks/AuthContext";
import userProfileImage from "../assets/userProfile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileItem = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState(null);
  const { user, token, logout } = useAuth();

  const handlePasswordChange = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        setPasswordChangeError("New passwords do not match.");
        return;
      }

      await axios.put(
        `http://localhost:4001/api/v1/users/${user.id}`,
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      logout();
      navigate("/");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleDleleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:4001/api/v1/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      logout();
      navigate("/login");
      console.log("Dlete Success");
    } catch (error) {
      console.error("Error delete profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-5 ">
      <div className="bg-white items-center p-5 border rounded text-center text-gray-500 max-w-sm w-96 h-screen">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src={userProfileImage}
          alt=""
        />
        <div className="text-sm mt-5">
          <a
            href="#"
            className="font-medium leading-none text-md text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out"
          >
            {user.username}
          </a>
          <p>Blogger</p>
        </div>

        <p className="mt-2 text-lg text-gray-900 ">Welcome to your Profile!</p>

        {token && (
          <div className="max-w-md mx-auto mt-8 p-6 bg-salate-200 rounded-md shadow-md">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-black mb-2">
                Change Password
              </h3>
              <InputField
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Old Password"
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <InputField
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full px-3 py-2 border rounded mb-2 "
              />
              <InputField
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full px-3 py-2 border rounded mb-2"
              />
              {passwordChangeError && (
                <p className="text-red-500 text-sm mb-2">
                  {passwordChangeError}
                </p>
              )}
              <Button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                onClick={handlePasswordChange}
              >
                Update Password
              </Button>
            </div>
          </div>
        )}

        <Button
          className="bg-red-400 text-white font-bold py-2 px-4 rounded hover:bg-red-600 mt-5"
          onClick={handleDleleteAccount}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default ProfileItem;
