import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Blogs from "./components/Blogs/BlogList";
import AuthForm from "./components/UserForm/UserForm";
import BlogForm from "./components/BlogForm/BlogForm";

function App() {
  const [isToken, setToken] = useState("");

  const handleButtonVisibility = () => {
    setToken(!isToken);
  };

  return (
    <Router>
      <Header isToken={isToken} />
      <Routes>
        <Route path="/" element={<Blogs isToken={isToken}/>} />
        <Route path="/create-blog" element={<BlogForm />} />
        <Route
          path="/login"
          element={
            isToken ? (
              <Navigate to="/" />
            ) : (
              <AuthForm handleButtonVisibility={handleButtonVisibility} />
            )
          }
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
