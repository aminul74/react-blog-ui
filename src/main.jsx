import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Hooks/AuthContext";
import { BlogProvider } from "./Hooks/BlogContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BlogProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BlogProvider>
  </React.StrictMode>
);
