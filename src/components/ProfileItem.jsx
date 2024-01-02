import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { useAuth } from "../Hooks/AuthContext";
import userProfileImage from "../assets/userProfile.png";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileItem = () => {
  const { user, token } = useAuth();
  const { userId } = useParams();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState(null);

  const handlePasswordChange = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        setPasswordChangeError("New passwords do not match.");
        return;
      }

      const response = await axios.put(
        `http://localhost:4001/api/v1/users/${userId}/password`, // Update the endpoint URL
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

      console.log("Response data:", response.data);

      // Assuming your API returns a success property
      if (response.data.success) {
        // Handle success (e.g., redirect user or show success message)
        console.log("Password updated successfully");
      } else {
        // Handle unsuccessful response (customize based on your API)
        console.log("Password update failed. Check response:", response.data);
        setPasswordChangeError(
          "Failed to update password. Please check your old password."
        );
      }

      // Clear password fields after attempt (whether successful or not)
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);

      if (error.response) {
        // Handle known errors with response from the server
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        // Handle cases where no response was received
        console.log("No response received. Request:", error.request);
      } else {
        // Handle errors setting up the request
        console.log("Error setting up the request:", error.message);
      }

      // Set an appropriate error message
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
      </div>
    </div>
  );
};

export default ProfileItem;
