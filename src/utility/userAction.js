import axios from "axios";

export const registerUser = async (data) => {
  // if (data.password !== data.confirmPassword) {
  //   throw new Error("Password not match");
  // }

  const response = await axios.post(
    "http://localhost:4001/api/v1/auth/register",
    {
      username: data.username,
      email: data.email,
      password: data.password,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data[0];
};

export const loginUser = async (data) => {
  const response = await axios.post(
    "http://localhost:4001/api/v1/auth/login",
    {
      username: data.username,
      password: data.password,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data[0];
};
