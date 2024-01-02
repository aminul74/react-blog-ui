import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { useAuth } from "../Hooks/AuthContext";
import userProfileImage from "../assets/userProfile.png";

const ProfileComponent = () => {
  const { user, updatePassword } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState(null);

  const handlePasswordChange = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        setPasswordChangeError("New passwords do not match.");
        return;
      }

      await updatePassword(newPassword);

      setNewPassword("");
      setConfirmNewPassword("");
      setPasswordChangeError(null);

      console.log("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error.message);
      setPasswordChangeError(
        "Failed to update password. Please check your old password."
      );
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
            className="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out"
          >
            {user.username}
          </a>
          <p>Blogger</p>
        </div>

        <p className="mt-2 text-sm text-gray-900">Wellcome to your Profile!</p>
        {/* <div className="Form"> */}
        <div className="max-w-md mx-auto mt-8 p-6 bg-slate-200 rounded-md shadow-md">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Change Password</h3>
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
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <InputField
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            {passwordChangeError && (
              <p className="text-red-500 text-sm mb-2">{passwordChangeError}</p>
            )}
            <Button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={handlePasswordChange}
            >
              Update Password
            </Button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default ProfileComponent;
