import React from "react";
import { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button";
import { useAuth } from "../ContextApi/AuthContext";
// import userProfileImage from "../assets/userProfile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmAlert from "../components/ConfirmAlert";
import { useMutation, useQuery } from "@tanstack/react-query";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [toastPopUp, setToastPopUp] = useState(false);

  const schema = yup.object().shape({
    oldPassword: yup.string().required("Old Password is required"),
    newPassword: yup
      .string()
      .required("New Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onPasswordChange = useCallback((message) => {
    setMessage(message);
    logout();
    navigate("/login");
    setToastPopUp(true);
  });

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["changePass", user.id],
    mutationFn: async (data) => {
      if (data.newPassword !== data.confirmNewPassword) {
        return;
      }
      return await axios.put(
        `http://localhost:4001/api/v1/users/${user.id}`,
        {
          old_password: data.oldPassword,
          new_password: data.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    },

    onSuccess: (data) => {
      // console.log("Update",data);
      onPasswordChange("Password update successfully!");
    },
  });
  const errMessage = error?.response.data[0].errMessage;

  const handlePasswordChange = (data) => {
    mutate(data);
  };

  const { mutate: deleteUser } = useMutation({
    mutationKey: ["deleteUser", user.id],
    mutationFn: async () => {
      await axios.delete(`http://localhost:4001/api/v1/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const onDeleteClick = () => {
    deleteUser();
  };

  const onCancelClick = () => {
    setShowAlert(false);
  };

  return (
    <div
      data-testid="profile-render"
      className="flex items-center justify-center mt-5"
    >
      {toastPopUp && (
        <div>
          <Notification
            message={message}
            onClose={() => setToastPopUp(false)}
            isVisible={setToastPopUp}
          />
        </div>
      )}

      <div className="max-w-2xl sm:max-w-2xl md:max-w-2xl lg:max-w-4xl bg-white items-center p-20 border rounded text-center text-gray-500">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src={"../assets/userProfile.png"}
          alt=""
        />
        <div className="text-sm mt-5">
          <a
            href="#"
            className="font-medium leading-none text-md text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out"
          ></a>
          <p>Blogger</p>
        </div>

        <p className="mt-2 text-lg text-gray-900 ">Welcome to your Profile!</p>

        {token && (
          <div className="max-w-lg mx-auto mt-8 p-12 bg-salate-200 rounded-md shadow-md">
            <p className="text-red-500 text-center">{errMessage}</p>
            <form
              data-testid="form-submit"
              onSubmit={handleSubmit(handlePasswordChange)}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-black mb-2">
                  Change Password
                </h3>
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-medium text-gray-700 text-left"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  {...register("oldPassword")}
                  placeholder="Old Password"
                  className="w-full px-3 py-2 border rounded mb-2"
                  data-testid="old-password-input"
                />
                {errors.oldPassword && (
                  <p className="text-red-500 text-sm mb-2">
                    {errors.oldPassword.message}
                  </p>
                )}

                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-medium text-gray-700 text-left"
                >
                  New Password
                </label>

                <input
                  type="password"
                  {...register("newPassword")}
                  placeholder="New Password"
                  className="w-full px-3 py-2 border rounded mb-2"
                  data-testid="new-password-input"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mb-2">
                    {errors.newPassword.message}
                  </p>
                )}
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-medium text-gray-700 text-left"
                >
                  Confirm Password
                </label>

                <input
                  type="password"
                  {...register("confirmNewPassword")}
                  placeholder="Confirm New Password"
                  className="w-full px-3 py-2 border rounded mb-2"
                  data-testid="confirm-new-password-input"
                />
                {errors.confirmNewPassword && (
                  <p className="text-red-500 text-sm mb-2">
                    {errors.confirmNewPassword.message}
                  </p>
                )}

                <Button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                  Update Password
                </Button>
              </div>
            </form>
            {isPending && "Password updating..."}
          </div>
        )}

        <Button
          className="bg-red-400 text-white font-bold py-2 px-4 rounded hover:bg-red-600 mt-5"
          onClick={() => setShowAlert(true)}
        >
          Delete Account
        </Button>

        {showAlert && (
          <ConfirmAlert
            onCancel={onCancelClick}
            onConfirm={onDeleteClick}
            titleMsg={"Delete your profile"}
            label={"Confirm Delete"}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
