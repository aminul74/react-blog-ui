import axios from "axios";

const registerUser = async (userData) => {
  const response = await axios.post(
    "http://localhost:4001/api/v1/auth/register",
    userData,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data[0];
};

export default registerUser;
