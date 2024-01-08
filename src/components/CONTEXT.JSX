// import { createContext, useContext, useReducer, useEffect } from "react";
// import axios from "axios";
// import PropTypes from "prop-types";

// const AuthContext = createContext();

// const initialState = {
//   token: localStorage.getItem("token") || null,
//   user: JSON.parse(localStorage.getItem("user")) || null,
// };

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         ...state,
//         token: action.payload.token,
//         user: action.payload.user,
//       };
//     case "LOGOUT":
//       return {
//         ...state,
//         token: null,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };

// const AuthProvider = ({ children }) => {
//   AuthProvider.propTypes = {
//     children: PropTypes.node.isRequired,
//   };

//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() => {
//     // Use effect to update localStorage whenever token or user changes
//     localStorage.setItem("token", state.token);
//     localStorage.setItem("user", JSON.stringify(state.user));
//   }, [state.token, state.user]);

//   const getUser = async (token) => {
//     try {
//       const response = await axios.get(
//         "http://localhost:4001/api/v1/users/my-profile",
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       return null;
//     }
//   };

//   const login = (newToken, newUser) => {
//     dispatch({ type: "LOGIN", payload: { token: newToken, user: newUser } });
//   };

//   const logout = () => {
//     dispatch({ type: "LOGOUT" });
//   };

//   return (
//     <AuthContext.Provider
//       value={{ token: state.token, login, logout, user: state.user, getUser }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export { AuthProvider, useAuth };