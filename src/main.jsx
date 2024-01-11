import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./ContextApi/AuthContext";
import { BlogProvider } from "./ContextApi/BlogContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BlogProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BlogProvider>
  // </React.StrictMode>
);
