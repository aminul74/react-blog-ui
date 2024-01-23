import * as yup from "yup";

const userValidation = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .matches(/^\S*$/, "Space not allowed"),
  email: yup
    .string()
    .email("Invalid email")
    .when("signup", {
      is: true,
      then: yup.string().required("Email is required"),
    }),
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().when("signup", {
    is: true,
    then: yup.string().required("Confirm Password is required"),
  }),
});

export default userValidation;
