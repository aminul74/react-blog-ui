import * as yup from "yup";
const userValidation = yup.object().shape({
  username: yup.string().required("Username is required"),
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
    then: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  }),
});

export default userValidation;
